<script setup lang="ts">
import type {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  TermFacetResult,
} from '@commercetools/platform-sdk'
import { productsService } from '@/services/productsService'
import ProductCard from '@components/product-card/ProductCard.vue'
import { computed, reactive, ref, watch, type Ref } from 'vue'
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
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
const alert = useAlertStore()
const router = useRouter()
const route = useRoute()

const { categories } = storeToRefs(useCategoriesStore())
const categoryId = ref()

loadingStore.setLoading(true)

const getLimitProductsOnPage = () => {
  const minDesktopWidth = 1440
  const maxTableWidth = 1099
  const windowWidth = window.innerWidth

  if (windowWidth < minDesktopWidth && windowWidth > maxTableWidth) {
    return 12
  } else if (windowWidth <= maxTableWidth) {
    return 8
  }
  return 16
}

let limitProductsOnPage = getLimitProductsOnPage()
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(totalProductsCount.value / limitProductsOnPage))

const products: Ref<ProductProjection[]> = ref([])
const totalProductsCount = ref(0)
const colorItems: Ref<string[]> = ref([])
const quantityItems: Ref<string[]> = ref([])
const isOpenSearch = ref(false)

const { cart } = storeToRefs(useCartStore())
const { favorites } = storeToRefs(useFavoritesStore())
const loadingStates: Ref<{ [key: string]: boolean }> = ref({})

const selectedFilters = reactive({
  sorting: (route.query.sorting as SortBy) ?? 'default',
  color: route.query.color as string[] | string,
  quantity: route.query.quantity as string[],
  search: route.query.search as string,
})

function updateCategoryId() {
  const currentCategory = categories.value.find((el) => el.parent.key === route.params.categoryId)

  if (route.params.subCategoryId) {
    categoryId.value =
      currentCategory?.children.find((subEl) => subEl.key === route.params.subCategoryId)?.id ?? ''
  } else {
    categoryId.value = currentCategory?.parent.id ?? ''
  }
}

watch(
  () => [route, categories],
  () => {
    if (!categories.value.length) {
      return
    }
    selectedFilters.sorting = route.query.sorting as SortBy
    selectedFilters.color = route.query.color as string[]
    selectedFilters.quantity = route.query.quantity as string[]
    fetchProducts()
  },
  { deep: true, immediate: true },
)

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

function fetchProducts() {
  limitProductsOnPage = getLimitProductsOnPage()
  updateCategoryId()

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

      loadingStore.setLoading(false)
    })
    .catch((error: Error) => {
      useAlertStore().show(error.message, 'warning')
    })
}

function addProductToCartById({ productId, variantId }: { productId: string; variantId: number }) {
  loadingStore.setLoading(true)

  cartService
    .addProductToCart({ productId, variantId, cart: cart.value })
    .then(() => {
      setTimeout(() => {
        loadingStore.setLoading(false)
      }, LOADING_TIMEOUT)
    })
    .catch((error: Error) => {
      loadingStore.setLoading(false)
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function addProductToFavorites({ productId, variantId }: { productId: string; variantId: number }) {
  favoritesService
    .addProductToFavoritesList({ productId, variantId, favorites: favorites.value })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

async function deleteProductFromFavoritesById(lineItemId: string) {
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
      useFavoritesStore().setFavorites(body)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function isProductInCart(productId: string, variantId: number) {
  if (!cart.value?.lineItems) {
    return false
  }
  return cartService.isProductInCart({ lineItems: cart.value?.lineItems, productId, variantId })
}

function isProductInFavorites(productId: string, variantId: number) {
  if (!favorites.value?.lineItems) {
    return false
  }
  return favoritesService.isProductInFavorites({
    lineItems: favorites.value?.lineItems,
    productId,
    variantId,
  })
}

function getLoadingState(productId: string) {
  return loadingStates.value[productId] || false
}
</script>

<template>
  <div class="d-flex filters-all">
    <div class="d-flex filters">
      <SelectInput
        class="filter"
        label="Color"
        :items="colorItems"
        v-model="selectedFilters.color"
        variant="underlined"
        is-chips
        is-clearable
        is-multiple
        :isHideDetails="true"
        @update:modelValue="selectColor"
      />

      <SelectInput
        class="filter"
        label="Quantity"
        :items="quantityItems"
        v-model="selectedFilters.quantity"
        variant="underlined"
        is-chips
        is-clearable
        is-multiple
        :isHideDetails="true"
        @update:modelValue="selectQuantity"
      />
    </div>
    <div class="d-flex search-sort">
      <SelectInput
        class="sort"
        label="Sort by"
        :items="SORTING_ITEMS"
        v-model="selectedFilters.sorting"
        variant="underlined"
        isHideDetails
        @update:modelValue="selectSorting"
      />

      <div class="d-flex search">
        <v-icon color="primary" class="search-icon" @click="isOpenSearch = !isOpenSearch"
          >mdi-magnify</v-icon
        >
        <Transition name="search-fade">
          <Input
            class="search-input"
            v-if="isOpenSearch"
            label="Search"
            type="text"
            placeholder="Search"
            isHideDetails
            isClearable
            v-model="selectedFilters.search"
            @update:modelValue="search"
        /></Transition>
      </div>
    </div>
  </div>

  <div class="d-flex products">
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
      :variantId="1"
      :isAddedInCart="isProductInCart(id, 1)"
      :isAddedInFavorites="isProductInFavorites(id, 1)"
      :loading="getLoadingState(id)"
      @addProductToCart="addProductToCartById($event)"
      @addProductToFavorites="addProductToFavorites($event)"
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
@use '@styles/mixins.scss';

.products {
  flex-wrap: wrap;
  gap: 2.8rem;
  justify-content: center;

  width: 100%;
  padding: 2rem 0;
}

.filters-all {
  flex-wrap: wrap;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-between;

  padding: 1rem;
}

.search-sort {
  flex-wrap: wrap;
  gap: 1.6rem;
  align-items: center;
  justify-content: end;
}

.search {
  gap: 1rem;
  align-items: center;
  justify-content: end;
  margin-top: 1rem;
}

.search-input {
  width: 17rem;
  padding: 0;
}

.search-fade-enter-active {
  transition: all 0.3s ease-out;
}

.search-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.search-fade-enter-from,
.search-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.filters {
  flex-wrap: wrap;
  gap: 1.6rem;
  align-items: center;
}

.filter {
  width: 17rem;
}

.sort {
  width: 10rem;
  max-width: 10rem;
}

.v-pagination {
  padding: 1rem 0 2rem;
}
</style>
