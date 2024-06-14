<script setup lang="ts">
import type {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  TermFacetResult,
} from '@commercetools/platform-sdk'
import { productsService } from '@/services/productsService'
import ProductCard from '@components/product-card/ProductCard.vue'
import { computed, reactive, ref, watch, watchEffect, type Ref } from 'vue'
import SelectInput from '@components/inputs/SelectInput.vue'
import { LOADING_TIMEOUT, SORTING_ITEMS } from '@/constants/constants'
import { type SortBy } from '@/enums/sortingCommand'
import { useRoute, useRouter } from 'vue-router'
import { Facet } from '@/enums/facet'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import Input from '@/components/inputs/Input.vue'
import { useAlertStore } from '@/stores/alert'
import { useCartStore } from '@/stores/cart'
import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'
import { cartService } from '@/services/cartService'
import { useFavoritesStore } from '@/stores/favorites'
import { favoritesApiService } from '@/services/favoritesApiService'
import { favoritesService } from '@/services/favoritesService'

const alert = useAlertStore()

const route = useRoute()
const router = useRouter()
const { categories } = storeToRefs(useCategoriesStore())
const categoryId = ref()

watchEffect(() => {
  const category = route.params.categoryId
  const subCategory = route.params.subCategoryId

  if (!categories.value.length) {
    return
  }
  const currentCategory = categories.value.find((el) => el.parent.key === category)
  if (subCategory) {
    categoryId.value =
      currentCategory?.children.find((subEl) => subEl.key === subCategory)?.id ?? ''
  } else {
    categoryId.value = currentCategory?.parent.id ?? ''
  }
})

const limitProductsOnPage = 16
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalProductsCount.value / limitProductsOnPage))

const products: Ref<ProductProjection[]> = ref([])
const totalProductsCount = ref(0)
const colorItems: Ref<string[]> = ref([])
const quantityItems: Ref<string[]> = ref([])

const { cart } = storeToRefs(useCartStore())
const { favorites } = storeToRefs(useFavoritesStore())
const loadingStates: Ref<{ [key: string]: boolean }> = ref({})

const selectedFilters = reactive({
  sorting: (route.query.sorting as SortBy) ?? 'default',
  color: route.query.color as string[] | string,
  quantity: route.query.quantity as string[],
  search: route.query.search as string,
})

const fetchProducts = () => {
  const offset = (currentPage.value - 1) * limitProductsOnPage

  productsService
    .getProducts({
      limit: limitProductsOnPage,
      offset,
      sorting: selectedFilters.sorting,
      categoryId: categoryId.value,
      colorFilter: selectedFilters.color,
      quantityFilter: selectedFilters.quantity,
      search: selectedFilters.search,
    })
    .then((response: ClientResponse<ProductProjectionPagedSearchResponse>) => {
      products.value = response.body.results || []
      totalProductsCount.value = response.body.total || 0

      colorItems.value = (response.body.facets[Facet.color] as TermFacetResult).terms.map<string>(
        (el) => el.term,
      )

      quantityItems.value = (
        response.body.facets[Facet.quantity] as TermFacetResult
      ).terms.map<string>((el) => el.term)
    })
    .catch((error: Error) => {
      useAlertStore().show(error.message, 'warning')
    })
}

const update =
  <T extends keyof typeof selectedFilters>(field: T) =>
  (value: (typeof selectedFilters)[T]) => {
    router.replace({ query: { ...route.query, [field]: value } })
    selectedFilters[field] = value
    fetchProducts()
  }

const search = update('search')
const selectSorting = update('sorting')
const selectColor = update('color')
const selectQuantity = update('quantity')

watch(
  () => route,
  () => {
    selectedFilters.sorting = route.query.sorting as SortBy
    selectedFilters.color = route.query.color as string[]
    selectedFilters.quantity = route.query.quantity as string[]
    fetchProducts()
  },
  { deep: true, immediate: true },
)

async function addProductToCartById(productId: string) {
  loadingStates.value[productId] = true

  await cartService
    .addProductToCart(productId, cart.value)
    .then(() => {
      setTimeout(() => {
        loadingStates.value[productId] = false
      }, LOADING_TIMEOUT)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

async function addProductToFavoritesById(productId: string) {
  await favoritesService
    .addProductToFavoritesList(productId, favorites.value)
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

async function deleteProductFromFavoritesById(lineItemId: string) {
  if (favorites.value?.id) {
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
}

function isProductInCart(productId: string) {
  if (!cart.value?.lineItems) {
    return false
  }
  return cartService.isProductInCart(cart.value?.lineItems, productId)
}

function isProductInFavorites(productId: string) {
  if (!favorites.value?.lineItems) {
    return false
  }
  return favoritesService.isProductInFavorites(favorites.value?.lineItems, productId)
}

function getLoadingState(productId: string) {
  return loadingStates.value[productId] || false
}
</script>

<template>
  <SelectInput
    label="Sort by"
    :items="SORTING_ITEMS"
    v-model="selectedFilters.sorting"
    variant="underlined"
    width="10rem"
    @update:modelValue="selectSorting"
  />

  <Input
    label="Search"
    type="text"
    placeholder="Search"
    icon="mdi-magnify"
    isHideDetails
    isClearable
    v-model="selectedFilters.search"
    @update:modelValue="search"
  />

  <SelectInput
    label="Color"
    :items="colorItems"
    v-model="selectedFilters.color"
    variant="underlined"
    is-chips
    is-clearable
    is-multiple
    @update:modelValue="selectColor"
  />

  <SelectInput
    label="Quantity"
    :items="quantityItems"
    v-model="selectedFilters.quantity"
    variant="underlined"
    is-chips
    is-clearable
    is-multiple
    @update:modelValue="selectQuantity"
  />

  <div class="d-flex">
    <ProductCard
      v-for="{ id, masterVariant, name, description, slug } in products"
      :key="id"
      :src="masterVariant.images?.[0]?.url"
      :name="name['en-GB']"
      :description="description?.['en-GB']"
      :price="getPriceAccordingToFractionDigits(masterVariant.prices?.[0]?.value)"
      :discountedPrice="
        getPriceAccordingToFractionDigits(masterVariant.prices?.[0]?.discounted?.value)
      "
      :productSlug="slug['en-GB']"
      :productId="id"
      :isAddedInCart="isProductInCart(id)"
      :isAddedInFavorites="isProductInFavorites(id)"
      :loading="getLoadingState(id)"
      @addProductToCart="addProductToCartById($event)"
      @addProductToFavorites="addProductToFavoritesById($event)"
      @deleteProductFromFavorites="deleteProductFromFavoritesById($event)"
    />
  </div>
  <v-pagination
    v-model="currentPage"
    @update:modelValue="fetchProducts"
    :length="totalPages"
    color="primary"
    density="comfortable"
    rounded="circle"
  ></v-pagination>
</template>

<style lang="scss" scoped>
.d-flex {
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 3rem;
}

.v-pagination {
  margin-top: 2.5rem;
}
</style>
