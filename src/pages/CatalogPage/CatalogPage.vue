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
import { SORTING_ITEMS } from '@/constants/constants'
import { type SortBy } from '@/enums/sortingCommand'
import { useRoute, useRouter } from 'vue-router'
import { Facet } from '@/enums/facet'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import Input from '@/components/inputs/Input.vue'
import { useAlertStore } from '@/stores/alert'
import { cartService } from '@/services/cartService'
import { useCartStore } from '@/stores/cart'

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

const { cart } = storeToRefs(useCartStore())
const loadingStates: Ref<{ [key: string]: boolean }> = ref({})

function addProductToCart(productId: string) {
  if (cart.value?.id) {
    loadingStates.value[productId] = true

    cartService.addProductToCart(cart.value.id, cart.value.version, productId).then(({ body }) => {
      setTimeout(() => {
        useCartStore().setCart(body)
        loadingStates.value[productId] = false
      }, 1000)
      //useCartStore().setCart(body)
      //loadingStates.value[productId] = false;
    })
  }
}
function isProduct(productId: string) {
  if (!cart.value?.lineItems) {
    return false
  }
  return cart.value.lineItems.some((item) => item.productId === productId)
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

  <div class="d-flex">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :src="product.masterVariant.images?.[0]?.url"
      :name="product.name['en-GB']"
      :description="product.description?.['en-GB']"
      :price="product.masterVariant.prices?.[0]?.value?.centAmount ?? 0"
      :discountedPrice="product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0"
      :productSlug="product.slug['en-GB']"
      :productKey="product.key"
      :productId="product.id"
      :isAdd="isProduct(product.id)"
      :loading="getLoadingState(product.id)"
      @addProduct="addProductToCart($event)"
    />
  </div>
  <v-pagination
    v-model="currentPage"
    @update:modelValue="fetchProducts"
    :length="totalPages"
    color="primary"
    density="comfortable"
  ></v-pagination>
</template>

<style lang="scss" scoped>
.d-flex {
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 3rem;
}
</style>
