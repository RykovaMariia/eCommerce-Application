<script setup lang="ts">
import type { ProductProjection } from '@commercetools/platform-sdk'
import { productsService } from '../services/productsService'
import Breadcrumb from '@components/breadcrumbs/Breadcrumb.vue'
import ProductCard from '@components/product-card/ProductCard.vue'
import { onMounted, ref, type Ref } from 'vue'

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

let products: Ref<ProductProjection[]> = ref([])
let productsCount: Ref<number> = ref(0)

onMounted(() => {
  productsService
    .products(limit, 30)
    .then((response) => {
      products.value = response.body.results
      productsCount.value = response.body.total || 0
    })
    .catch((error: Error) => {
      throw new Error(error.message)
    })
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
      :price="(product.masterVariant.prices?.[0]?.value?.centAmount ?? 0) / 100"
      :discountedPrice="
        (product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0) / 100
      "
    />
  </div>
  <v-pagination
    :length="Math.ceil(productsCount / limit)"
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
