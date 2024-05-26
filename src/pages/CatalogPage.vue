<script setup lang="ts">
import type { ProductProjection } from '@commercetools/platform-sdk'
import { productsService } from '../services/productsService'
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
import ProductCard from '@components/product-card/ProductCard.vue'
import { computed, onMounted, ref, type Ref } from 'vue'

const items = [
  {
    title: 'Main',
    disabled: false,
    href: '/',
  },
  {
    title: 'Catalog',
    disabled: true,
    href: '/catalog',
  },
]

const limit = 20
const currentPage = ref(1)

let products: Ref<ProductProjection[]> = ref([])
let productsCount = ref(0)

const totalPages = computed(() => Math.ceil(productsCount.value / limit))

const fetchProducts = () => {
  const offset = (currentPage.value - 1) * limit
  productsService
    .products(limit, offset)
    .then((response) => {
      products.value = response.body.results
      productsCount.value = response.body.total || 0
    })
    .catch((error: Error) => {
      throw new Error(error.message)
    })
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <Breadcrumb :items="items" />
  <div class="d-flex">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :src="product.masterVariant.images?.[0]?.url"
      :name="product.name['en-GB']"
      :description="product.description?.['en-GB']"
      :price="product.masterVariant.prices?.[0]?.value?.centAmount ?? 0"
      :discountedPrice="product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0"
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
