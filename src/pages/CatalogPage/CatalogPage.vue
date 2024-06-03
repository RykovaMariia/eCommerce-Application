<script setup lang="ts">
import type {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk'
import { productsService } from '@/services/productsService'
import ProductCard from '@components/product-card/ProductCard.vue'
import { computed, ref, watch, type Ref } from 'vue'
import SelectInput from '@components/inputs/SelectInput.vue'
import { SORTING_ITEMS } from '@/constants/constants'
import { SortingCommand, type SortBy } from '@/enums/sortingCommand'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { categoriesStore } from '@/stores/categoriesStore'

const route = useRoute()
const { categories } = storeToRefs(categoriesStore())
const categoryId = ref('')

const updateCategory = () => {
  const category = route.params.categoryId
  const subCategory = route.params.subCategoryId

  if (categories.value.length) {
    categoryId.value = categories.value.find((el) => el.parent.key === category)?.parent.id ?? ''

    if (subCategory) {
      categoryId.value =
        categories.value
          .find((el) => el.parent.key === category)
          ?.children.find((subEl) => subEl.key === subCategory)?.id ?? ''
    }
  }
}
const limit = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(productsCount.value / limit))

let products: Ref<ProductProjection[]> = ref([])
let productsCount = ref(0)

const selectedSorting = ref(SortingCommand.default)

const fetchProducts = () => {
  const offset = (currentPage.value - 1) * limit
  productsService
    .getProducts(limit, offset, selectedSorting.value, categoryId?.value)
    .then((response: ClientResponse<ProductProjectionPagedSearchResponse>) => {
      products.value = response.body.results
      productsCount.value = response.body.total || 0
    })
    .catch((error: Error) => {
      throw new Error(error.message)
    })
}

watch(
  route,
  () => {
    updateCategory()
    fetchProducts()
  },
  { immediate: true },
)
</script>

<template>
  <SelectInput
    label="Sort by"
    :items="SORTING_ITEMS"
    variant="underlined"
    width="8rem"
    @update:modelValue="
      (value: SortBy) => {
        selectedSorting = SortingCommand[value]
        fetchProducts()
      }
    "
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
}
</style>
