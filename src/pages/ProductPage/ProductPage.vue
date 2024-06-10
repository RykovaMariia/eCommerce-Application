<script setup lang="ts">
import { computed, reactive, type Ref } from 'vue'
import Button from '@/components/buttons/Button.vue'
import { type ProductData, type ProductItem } from '@/interfaces/productData'
import { ref } from 'vue'
import type { ProductCatalogData, ProductVariant } from '@commercetools/platform-sdk'
import { getUniqueValues } from '@/utils/getUniqueValues'
import ModalWindow from './components/ModalWindow.vue'
import { localStorageService } from '@/services/storageService'
import { productsService } from '@/services/productsService'
import { FULL_PERCENTAGE } from '@/constants/constants'

const imageIndex = ref(0)
const multiplier = ref(1)
const isMainAttribute = ref(true)

const product: ProductData = reactive({
  description: '',
  name: '',
  images: [],
  variants: [],
})

let attributeValues: string[][] = []
let masterAttributeNames: string[] = []
const isProductDataLoaded = ref(false)

function retrieveVariantsData({ attributes, prices }: ProductVariant) {
  return {
    attributes: attributes?.map((value) => value.value[0].key) ?? [],
    price: prices?.[0].value.centAmount ?? 0,
    discountPrice: prices?.[0].discounted?.value.centAmount ?? 0,
  }
}

const productId = localStorageService.getData('productId')
const selectedVariants: Ref<string[]> = ref([])

if (productId !== null) {
  productsService
    .getProduct(productId)
    .then(({ current: { description, masterVariant, name, variants } }: ProductCatalogData) => {
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
      const mainVariant: ProductItem = retrieveVariantsData(masterVariant)
      const allVariants = variants?.map(retrieveVariantsData)
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

const formatPrice = (price: number) => {
  return ((price / FULL_PERCENTAGE) * multiplier.value).toFixed(2)
}

const definePrice = ({ price, discountPrice }: ProductItem) => {
  const formattedPrice = formatPrice(price)
  const formattedDiscountPrice = formatPrice(discountPrice)
  return discountPrice ? { formattedPrice, formattedDiscountPrice } : { formattedPrice }
}
const price = computed(() => {
  const variant = product.variants.find(
    ({ attributes }) =>
      attributes[0] === selectedVariants.value[0] && attributes[1] === selectedVariants.value[1],
  )
  return definePrice(variant ?? product.variants[0])
})
</script>

<template>
  <div class="product-container">
    <v-col>
      <v-sheet max-width="28rem" class="mx-auto slider-image">
        <v-sheet rounded="6px" class="slider-image">
          <div class="d-flex align-center justify-center slider-image" id="activator">
            <v-img cover :src="product.images[imageIndex]" rounded="lg"></v-img>
          </div>
        </v-sheet>
        <div>
          <div v-if="product.images.length > 1">
            <v-slide-group v-model="imageIndex">
              <v-slide-group-item
                v-for="(groupItem, i) in product.images"
                :key="groupItem"
                v-slot="{ select }"
              >
                <v-card
                  :class="['ma-4']"
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
      <h1>{{ product.name }}</h1>
      <div>{{ product.description }}</div>

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
        <div v-if="isProductDataLoaded" class="price-wrapper">
          <div class="price_discount" v-if="price.formattedDiscountPrice">
            € {{ price.formattedDiscountPrice }}
          </div>
          <div class="price" :class="{ 'price_line-through': price.formattedDiscountPrice }">
            € {{ price.formattedPrice }}
          </div>
        </div>
      </div>
      <Button textContent="Add to cart" />
    </v-col>
    <ModalWindow activator="#activator" :productImages="product.images" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.slider-image {
  max-width: 27rem;
  box-shadow: none;
}

.v-sheet {
  background-color: transparent;
}

.product-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

@include mixins.media-middle {
  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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
  justify-content: space-between;

  padding: 1rem 0;
}

.value-wrapper {
  padding: 1rem 0;
}

.value-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.price {
  font-size: 1.5rem;
  color: constants.$color-text-dark;
  opacity: 0.7;

  &_discount {
    font-size: 1.5rem;
    color: constants.$color-sale;
  }

  &_line-through {
    text-decoration: line-through;
  }
}
</style>
