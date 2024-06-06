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
import PriceForm from './components/PriceForm.vue'
import { storeToRefs } from 'pinia'
import { categoriesStore } from '@/stores/categoriesStore'
import Input from '@/components/inputs/Input.vue'
import { alertStore } from '@/stores/alertStore'

const route = useRoute()
const router = useRouter()
const { categories } = storeToRefs(categoriesStore())
const categoryId = ref()

watchEffect(() => {
  const category = route.params.categoryId
  const subCategory = route.params.subCategoryId

  if (!categories.value.length) return
  const currentCategory = categories.value.find((el) => el.parent.key === category)
  if (subCategory) {
    categoryId.value =
      currentCategory?.children.find((subEl) => subEl.key === subCategory)?.id ?? ''
  } else {
    categoryId.value = currentCategory?.parent.id ?? ''
  }
})

const limit = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(productsCount.value / limit))

const products: Ref<ProductProjection[]> = ref([])
const productsCount = ref(0)
const colorItems: Ref<string[]> = ref([])
const quantityItems: Ref<string[]> = ref([])

const selectedFilters = reactive({
  sorting: (route.query.sorting as SortBy) ?? 'default',
  color: route.query.color as string[] | string,
  quantity: route.query.quantity as string[],
  price: route.query.price as [string, string],
  search: route.query.search as string,
})

const fetchProducts = () => {
  const offset = (currentPage.value - 1) * limit

  productsService
    .getProducts({
      limit,
      offset,
      sorting: selectedFilters.sorting,
      categoryId: categoryId.value,
      colorFilter: selectedFilters.color,
      quantityFilter: selectedFilters.quantity,
      priceFilter: selectedFilters.price,
      search: selectedFilters.search,
    })
    .then((response: ClientResponse<ProductProjectionPagedSearchResponse>) => {
      products.value = response.body.results || []
      productsCount.value = response.body.total || 0

      colorItems.value = (response.body.facets[Facet.color] as TermFacetResult).terms.map(
        (el) => el.term,
      ) as string[]

      quantityItems.value = (response.body.facets[Facet.quantity] as TermFacetResult).terms.map(
        (el) => el.term,
      ) as string[]
    })
    .catch((error: Error) => {
      alertStore().show(error.message, 'warning')
    })
}

const selectSorting = (value: SortBy) => {
  router.replace({ query: { ...route.query, sorting: value } })
  selectedFilters.sorting = value
  fetchProducts()
}

const selectColor = (value: string[]) => {
  router.replace({ query: { ...route.query, color: value } })
  selectedFilters.color = value
  fetchProducts()
}

const selectQuantity = (value: string[]) => {
  router.replace({ query: { ...route.query, quantity: value } })
  selectedFilters.quantity = value
  fetchProducts()
}

const selectPrice = (value: { from: string; to: string }) => {
  router.replace({ query: { ...route.query, price: [value.from, value.to] } })
  selectedFilters.price = [value.from, value.to]
  fetchProducts()
}

const search = (value: string) => {
  router.replace({ query: { ...route.query, search: value } })
  selectedFilters.search = value
  fetchProducts()
}

watch(
  () => route,
  () => {
    selectedFilters.sorting = route.query.sorting as SortBy
    selectedFilters.color = route.query.color as string[]
    selectedFilters.quantity = route.query.quantity as string[]
    selectedFilters.price = route.query.price as [string, string]
    fetchProducts()
  },
  { deep: true, immediate: true },
)
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
  <PriceForm @priceFilterUpdated="selectPrice" />

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
