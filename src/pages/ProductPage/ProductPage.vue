<script setup lang="ts">
import { computed, reactive, type Ref } from 'vue'
import Button from '@/components/buttons/Button.vue'
import { type ProductData, type ProductItem } from '@/interfaces/productData'
import { ref } from 'vue'
import type { Product, ProductVariant } from '@commercetools/platform-sdk'
import { getUniqueValues } from '@/utils/getUniqueValues'
import ModalWindow from './components/ModalWindow.vue'
import { localStorageService } from '@/services/storageService'
import { productsService } from '@/services/productsService'
import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { cartService } from '@/services/cartService'
import { cartApiService } from '@/services/cartApiService'
import { useAlertStore } from '@/stores/alert'
import Price from '@/components/price/Price.vue'
import { favoritesService } from '@/services/favoritesService'
import { useFavoritesStore } from '@/stores/favorites'
import { favoritesApiService } from '@/services/favoritesApiService'

let attributeValues: string[][] = []
let masterAttributeNames: string[] = []
const productId = localStorageService.getData('productId') ?? ''

const alert = useAlertStore()

const { favorites } = storeToRefs(useFavoritesStore())
const { cart } = storeToRefs(useCartStore())

const imageIndex = ref(0)
const isMainAttribute = ref(true)
const isProductDataLoaded = ref(false)
const selectedVariants: Ref<string[]> = ref([])

const product: ProductData = reactive({
  description: '',
  name: '',
  images: [],
  variants: [],
})

const price = computed(() => {
  const variant = cartService.getVariantByAttribute(product.variants, selectedVariants.value)
  return definePrice(variant ?? product.variants[0])
})

const isInCart = computed(() => {
  if (!cart.value?.lineItems) {
    return
  }
  const variantId = cartService.getVariantByAttribute(product.variants, selectedVariants.value)?.id
  if (!variantId || !productId) {
    return
  }
  return cartService.isLineItemInCart({ lineItems: cart.value?.lineItems, productId, variantId })
})

const textContent = computed(() => {
  return !isInCart.value ? 'Add to cart' : 'Remove from cart'
})

const color = computed(() => {
  return !isInCart.value ? 'secondary' : 'primary'
})

const isInFavorites = computed(() => {
  if (!favorites.value?.lineItems) {
    return false
  }
  const variantId = cartService.getVariantByAttribute(product.variants, selectedVariants.value)?.id
  if (!variantId || !productId) {
    return false
  }
  return favoritesService.isProductInFavorites({
    lineItems: favorites.value?.lineItems,
    productId,
    variantId,
  })
})

const setIconFavorites = computed(() => {
  return !isInFavorites.value ? 'mdi-heart-outline' : 'mdi-heart'
})

function retrieveVariantsData({ id, attributes, prices }: ProductVariant) {
  return {
    id,
    attributes: attributes?.map((value) => value.value[0].key) ?? [],
    price: getPriceAccordingToFractionDigits(prices?.[0].value),
    discountPrice: getPriceAccordingToFractionDigits(prices?.[0].discounted?.value),
  }
}

if (productId !== null) {
  productsService
    .getProduct(productId)
    .then(({ masterData }: Product) => {
      const { description, name, masterVariant, variants } = masterData.current
      product.description = description?.['en-GB'] ?? ''
      product.name = name?.['en-GB']
      product.images = masterVariant.images?.map(({ url }) => url) ?? []
      masterAttributeNames = masterVariant.attributes?.map(({ name }) => name) ?? []
      const variantAttributes = variants?.map((variant) => variant.attributes).flat()
      const attributesList = [masterVariant.attributes, ...variantAttributes].flat()
      attributeValues = masterAttributeNames.map((attributeName) => {
        const keys: string[] = attributesList
          .map((attribute) => {
            if (attribute?.name === attributeName) {
              return attribute.value[0]['key']
            }
          })
          .filter((value) => value)
        return getUniqueValues(keys)
      })
      const mainVariant: ProductItem = retrieveVariantsData(masterData.current.masterVariant)
      const allVariants = masterData.current.variants?.map(retrieveVariantsData)
      product.variants = [mainVariant, ...allVariants]
      isProductDataLoaded.value = true
      selectedVariants.value = [...product.variants[0].attributes]
    })
    .catch((error: Error) => {
      console.warn(`Error: ${error.message}`, 'warning')
    })
}

const setVariant = (value: string, index: number) => {
  selectedVariants.value[index] = value
}

const definePrice = ({ price, discountPrice }: ProductItem) => {
  return discountPrice ? { price, discountPrice } : { price }
}

async function addProductToCart() {
  const variantId =
    cartService.getVariantByAttribute(product.variants, selectedVariants.value)?.id ?? 1
  cartService.addProductToCart({ productId, variantId, cart: cart.value }).catch((error: Error) => {
    alert.show(`Error: ${error.message}`, 'warning')
  })
}

function removeProductFromCart() {
  if (!cart.value?.lineItems || !productId) {
    return
  }
  const variantId = cartService.getVariantByAttribute(product.variants, selectedVariants.value)?.id
  if (!variantId) {
    return
  }
  const lineItemId = cartService.getLineIdByProduct({
    lineItems: cart.value?.lineItems,
    productId,
    variantId,
  })
  if (!lineItemId) {
    return
  }
  cartApiService
    .removeLineItem({ id: cart.value.id, version: cart.value.version, lineItemId })
    .then(({ body }) => {
      alert.show('Product is removed', 'success')
      useCartStore().setCart(body)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function setAction() {
  !isInCart.value ? addProductToCart() : removeProductFromCart()
}

async function addProductToFavorites() {
  const variantId = cartService.getVariantByAttribute(product.variants, selectedVariants.value)?.id
  if (!variantId || !productId) {
    return
  }
  await favoritesService
    .addProductToFavoritesList({ productId, variantId, favorites: favorites.value })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function deleteProductFromFavoritesById() {
  const variantId = cartService.getVariantByAttribute(product.variants, selectedVariants.value)?.id
  if (!favorites.value?.lineItems || !productId || !variantId) {
    return
  }
  const lineItemId = favoritesService.getLineIdByProduct({
    lineItems: favorites.value?.lineItems,
    productId,
    variantId,
  })
  if (!lineItemId) {
    return
  }
  favoritesApiService
    .removeLineItemFromFavorites({
      id: favorites.value.id,
      version: favorites.value.version,
      lineItemId,
    })
    .then(({ body }) => {
      useFavoritesStore().setFavorites(body)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function handleFavoriteChange() {
  return !isInFavorites.value ? addProductToFavorites() : deleteProductFromFavoritesById()
}
</script>

<template>
  <div class="d-flex justify-center product-container">
    <v-col>
      <v-sheet max-width="27rem" class="mx-auto">
        <div>
          <div class="slider-image" id="activator">
            <v-img cover :src="product.images[imageIndex]" rounded="lg"></v-img>
          </div>
        </div>
        <div>
          <div v-if="product.images.length > 1">
            <v-slide-group v-model="imageIndex">
              <v-slide-group-item
                v-for="(groupItem, i) in product.images"
                :key="groupItem"
                v-slot="{ select }"
              >
                <v-card
                  :class="['slider-card']"
                  height="100"
                  width="100"
                  @click="select"
                  :style="{
                    'background-image': `url(${product.images[i]})`,
                    'background-size': 'cover',
                  }"
                >
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </div>
        </div>
      </v-sheet>
    </v-col>
    <v-col>
      <div class="d-flex align-center justify-space-between">
        <h1 class="title">{{ product.name }}</h1>
      </div>
      <div class="description">{{ product.description }}</div>

      <div v-if="masterAttributeNames.length">
        <div v-for="(attributesArray, n) in attributeValues" :key="n" class="value-wrapper">
          <div class="attribute-name">{{ masterAttributeNames[n] }}:</div>
          <v-item-group selected-class="selected-group" mandatory>
            <div class="value-container">
              <div v-for="(attribute, i) in attributesArray" :key="attribute">
                <v-item v-slot="{ selectedClass, toggle }">
                  <v-card
                    :class="[
                      'value-container attribute',
                      isMainAttribute && i === 0 ? 'selected-group' : selectedClass,
                    ]"
                    @click="setVariant(attribute, n), (isMainAttribute = false), toggle?.()"
                  >
                    <div class="d-flex flex-grow-1 text-center">
                      {{ attribute }}
                    </div>
                  </v-card>
                </v-item>
              </div>
            </div>
          </v-item-group>
        </div>
      </div>

      <div class="price-wrapper">
        <div class="d-flex ga-4 align-center">
          <Button :textContent :color @click="setAction" />
          <v-btn icon @click="handleFavoriteChange"
            ><v-icon :icon="setIconFavorites"></v-icon
          ></v-btn>
        </div>
        <div v-if="isProductDataLoaded" class="price-wrapper">
          <Price
            :isWithDiscount="!!price.discountPrice"
            :price="price.price"
            :priceWithDiscount="price.discountPrice"
          />
        </div>
      </div>
    </v-col>
    <ModalWindow activator="#activator" :productImages="product.images" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.slider-image {
  cursor: pointer;

  max-width: 27rem;
  margin-bottom: 1rem;

  border: 1px solid constants.$color-primary;
  border-radius: 9px;
  box-shadow: none;
}

.v-sheet {
  background-color: transparent;
}

.v-card--variant-elevated {
  border: 1px solid constants.$color-primary;
  border-radius: 9px;
  box-shadow: none;
}

.slider-card {
  margin-right: 0.5rem;
}

::v-deep(.v-slide-group__content) {
  justify-content: center;
}

.product-container {
  display: flex;
  justify-content: center;
}

.title {
  margin-bottom: 1.5rem;
  line-height: 100%;
}

@include mixins.media-middle {
  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.mdi-heart,
.mdi-heart-outline {
  color: constants.$color-sale;
}

.v-btn--variant-elevated {
  background: none;
  box-shadow: none;
}

.v-btn:hover > .v-btn__overlay {
  opacity: 0;
}

.description {
  text-align: justify;
}

.attribute {
  padding: 0.2rem;
  background-color: transparent;
  border: 1px solid constants.$color-primary;
  box-shadow: none;
}

.attribute-name {
  text-transform: capitalize;
}

.selected-group {
  border: 2px solid constants.$color-primary;
}

.price-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  padding: 1rem 0;

  font-size: 1.5rem;
}

.value-wrapper {
  padding: 1rem 0;
}

.value-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
