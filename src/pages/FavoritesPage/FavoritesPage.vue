<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import ProductCard from '@/components/product-card/ProductCard.vue'
import { storeToRefs } from 'pinia'
import { ref, watchEffect, type Ref } from 'vue'
import { productsService } from '@/services/productsService'
import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'
import { cartService } from '@/services/cartService'
import { useAlertStore } from '@/stores/alert'
import { LOADING_TIMEOUT } from '@/constants/constants'
import { useCartStore } from '@/stores/cart'
import { favoritesApiService } from '@/services/favoritesApiService'
import IconHeart from '@/components/icons/IconHeart.vue'

interface FavoritesProducts {
  name: string
  description: string
  price: number
  discountedPrice: number
  src: string
  productSlug: string
  productId: string
  variantId: number
}
const alert = useAlertStore()
const favoritesStore = useFavoritesStore()

const { favorites } = storeToRefs(favoritesStore)
const { cart } = storeToRefs(useCartStore())

const loadingStates: Ref<{ [key: string]: boolean }> = ref({})
const favoritesProducts: Ref<FavoritesProducts[]> = ref([])

watchEffect(fetchProducts)

async function fetchProducts() {
  const lineItems = favoritesStore.lineItemsInFavorites
  if (!lineItems) {
    return
  }
  const lineItemsPromises = lineItems.map(async (lineItem) => {
    const result = await productsService.getProduct(lineItem.productId)
    const currentProduct = result.masterData.current
    const currentVariant =
      lineItem.variantId !== 1
        ? currentProduct.variants.find(({ id }) => id === lineItem.variantId)
        : currentProduct.masterVariant
    return {
      name: currentProduct.name['en-GB'] ?? '',
      description: currentProduct.description?.['en-GB'] ?? '',
      price: getPriceAccordingToFractionDigits(currentVariant?.prices?.[0].value),
      discountedPrice: getPriceAccordingToFractionDigits(
        currentVariant?.prices?.[0].discounted?.value,
      ),
      src: currentVariant?.images?.[0].url ?? '',
      productSlug: currentProduct.slug['en-GB'],
      productId: result.id,
      variantId: currentVariant?.id ?? 1,
    }
  })

  favoritesProducts.value = await Promise.all(lineItemsPromises)
}

async function addProductToCartById({
  productId,
  variantId,
}: {
  productId: string
  variantId: number
}) {
  loadingStates.value[productId] = true

  await cartService
    .addProductToCart({ productId, variantId, cart: cart.value })
    .then(() => {
      setTimeout(() => {
        loadingStates.value[productId] = false
      }, LOADING_TIMEOUT)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function getLoadingState(productId: string) {
  return loadingStates.value[productId] || false
}

function isProductInCart(productId: string, variantId: number) {
  if (!cart.value?.lineItems) {
    return false
  }
  return cartService.isProductInCart({ lineItems: cart.value.lineItems, productId, variantId })
}

async function deleteProductFromFavorites(lineItemId: string) {
  if (!favorites.value?.id) {
    return
  }
  favoritesApiService
    .removeLineItemFromFavorites({
      id: favorites.value.id,
      version: favorites.value.version,
      lineItemId,
    })
    .then(({ body }) => {
      favoritesStore.setFavorites(body)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}
</script>

<template>
  <TransitionGroup v-if="favoritesProducts.length" tag="div" class="d-flex" name="fade">
    <ProductCard
      v-for="{
        name,
        description,
        price,
        discountedPrice,
        src,
        productSlug,
        productId,
        variantId,
      } in favoritesProducts"
      :key="productId"
      :src
      :name
      :description
      :price
      :discountedPrice
      :productSlug
      :productId
      :variantId
      :loading="getLoadingState(productId)"
      :isAddedInCart="isProductInCart(productId, variantId)"
      :isAddedInFavorites="true"
      @addProductToCart="addProductToCartById($event)"
      @deleteProductFromFavorites="deleteProductFromFavorites($event)"
    />
  </TransitionGroup>
  <Transition name="empty-fade" class="d-flex empty-favorites">
    <div v-if="!favoritesProducts.length">
      <IconHeart class="icon-heart" />
      <div class="text-favorites">
        The products you liked will be here. Just click on the heart on the product card
        <RouterLink class="catalog-link" to="/catalog">Go to catalog</RouterLink>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.d-flex {
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
}

.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-leave-to {
  transform: scaleX(0.01) translate(30px, 0);
  opacity: 0;
}

.empty-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.empty-fade-enter-from {
  transform: scaleX(0.01) translate(30px, 0);
  opacity: 0;
}

.empty-favorites {
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
}

.icon-heart {
  margin-bottom: 1.4rem;
}

.text-favorites {
  max-width: 18rem;
  text-align: center;
}

.catalog-link {
  text-decoration: underline;
}
</style>
