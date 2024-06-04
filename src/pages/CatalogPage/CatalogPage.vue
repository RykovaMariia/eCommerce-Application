<script setup lang="ts">
import type {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
  TermFacetResult,
} from '@commercetools/platform-sdk'
import { productsService } from '@/services/productsService'
import ProductCard from '@components/product-card/ProductCard.vue'
import { computed, ref, watchEffect, type Ref } from 'vue'
import SelectInput from '@components/inputs/SelectInput.vue'
import { HUNDRED, SORTING_ITEMS } from '@/constants/constants'
import { type SortBy } from '@/enums/sortingCommand'
import { useRoute, useRouter } from 'vue-router'
import { Facet } from '@/enums/facet'
import PriceForm from './PriceForm.vue'
import { storeToRefs } from 'pinia'
import { categoriesStore } from '@/stores/categoriesStore'
import Input from '@/components/inputs/Input.vue'

const route = useRoute()
const router = useRouter()
const { categories } = storeToRefs(categoriesStore())
const categoryId = ref()

watchEffect(() => {
  const category = route.params.categoryId
  const subCategory = route.params.subCategoryId

  if (categories.value.length) {
    const currentCategory = categories.value.find((el) => el.parent.key === category)

    if (subCategory) {
      categoryId.value =
        currentCategory?.children.find((subEl) => subEl.key === subCategory)?.id ?? ''
    } else {
      categoryId.value = currentCategory?.parent.id ?? ''
    }
  }
})

const limit = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(productsCount.value / limit))

let products: Ref<ProductProjection[]> = ref([])
let productsCount = ref(0)
let colorItems: Ref<string[]> = ref([])
let quantityItems: Ref<string[]> = ref([])
let range: Ref<string[]> = ref([])

const selectedColor: Ref<string[]> = ref((route.query.color as string[]) ?? [])
const selectedSorting: Ref<SortBy> = ref((route.query.sorting as SortBy) ?? 'default')
const selectedQuantity: Ref<string[]> = ref((route.query.quantity as string[]) ?? [])
const selectedPrice: Ref<[string, string]> = ref((route.query.price as [string, string]) ?? [])
const searchString = ref('')

const fetchProducts = () => {
  const offset = (currentPage.value - 1) * limit

  console.warn(searchString.value)

  productsService
    .getProducts(
      limit,
      offset,
      selectedSorting.value,
      categoryId?.value,
      selectedColor.value,
      selectedQuantity.value,
      selectedPrice.value,
      searchString.value,
    )
    .then((response: ClientResponse<ProductProjectionPagedSearchResponse>) => {
      products.value = response.body.results
      productsCount.value = response.body.total || 0
      colorItems.value = (response.body.facets[Facet.color] as TermFacetResult).terms.map(
        (el) => el.term,
      ) as string[]
      quantityItems.value = (response.body.facets[Facet.quantity] as TermFacetResult).terms.map(
        (el) => el.term,
      ) as string[]

      const prices = (response.body.facets[Facet.price] as TermFacetResult).terms
        .map((el) => +el.term / HUNDRED)
        .sort((a, b) => a - b)
      range.value = [prices[0].toString(), prices[prices.length - 1].toString()]
    })
    .catch((error: Error) => {
      throw new Error(error.message)
    })
}

const selectSorting = (value: SortBy) => {
  router.replace({ query: { ...route.query, sorting: value } })
  selectedSorting.value = value
  fetchProducts()
}

const selectColor = (value: string[]) => {
  router.replace({ query: { ...route.query, color: value } })
  selectedColor.value = value
  fetchProducts()
}

const selectQuantity = (value: string[]) => {
  router.replace({ query: { ...route.query, quantity: value } })
  selectedQuantity.value = value
  fetchProducts()
}

const selectPrice = (value: { from: string; to: string }) => {
  router.replace({ query: { ...route.query, price: [value.from, value.to] } })
  selectedPrice.value = [value.from, value.to]
  fetchProducts()
}

const search = (value: string) => {
  router.replace({ query: { ...route.query, search: value } })
  searchString.value = value
  fetchProducts()
}

watchEffect(() => {
  selectedSorting.value = route.query.sorting as SortBy
  selectedColor.value = route.query.color as string[]
  selectedQuantity.value = route.query.quantity as string[]
  selectedPrice.value = route.query.price as [string, string]
  fetchProducts()
})
</script>

<template>
  <SelectInput
    label="Sort by"
    :items="SORTING_ITEMS"
    v-model="selectedSorting"
    variant="underlined"
    width="10rem"
    @update:modelValue="selectSorting"
  />
  <SelectInput
    label="Color"
    :items="colorItems"
    v-model="selectedColor"
    variant="underlined"
    chips
    clearable
    multiple
    @update:modelValue="selectColor"
  />

  <SelectInput
    label="Quantity"
    :items="quantityItems"
    variant="underlined"
    chips
    clearable
    multiple
    @update:modelValue="selectQuantity"
  />
  <PriceForm @priceFilterUpdated="selectPrice" :priceRange="range" />

  <Input
    label="Search"
    type="text"
    placeholder="Search"
    icon="mdi-magnify"
    isHideDetails
    isClearable
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
