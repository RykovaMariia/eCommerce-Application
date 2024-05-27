<script setup lang="ts">
import { productService } from '@/services/productService'
import { onMounted, reactive } from 'vue'
import Button from '@/components/buttons/Button.vue'
import { type ProductData } from '@/interfaces/productData'
import { ref } from 'vue'

let source = ref(0)

console.warn(source.value)

let product: ProductData = reactive({
  description: '',
  name: '',
  images: [],
  attributes: [],
})

onMounted(() => {
  productService
    .getProduct()
    .then((data) => {
      product.description = data.current.description?.['en-GB'] ?? ''
      product.name = data.current.name?.['en-GB']
      const images = data.current.masterVariant.images?.map(({ url }) => {
        return url
      })
      product.images = images ?? ''
      product.attributes = data.current.masterVariant.attributes ?? ''
    })
    .catch((error: Error) => {
      console.warn(`Error: ${error.message}`, 'warning')
    })
})
</script>

<template>
  <div class="product-container">
    <v-col>
      <v-sheet max-width="28rem">
        <v-sheet rounded="6px">
          <div class="d-flex fill-height align-center justify-center">
            <v-img
              :width="280"
              cover
              :src="product.images[source]"
              rounded="lg"
            ></v-img>
          </div>
        </v-sheet>
        <v-slide-group v-model="source">
          <v-slide-group-item v-for="(n, index) in product.images" :source="n" :key="n" v-slot="{ toggle }">
            <v-card
              :class="['ma-4']"
              height="100"
              width="100"
              @click="toggle"
              :image="product.images[index]"
            >
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-col>
    <v-col>
      <h2>{{ product.name }}</h2>
      <v-col>{{ product.description }}</v-col>
      <Button textContent="Add to cart" />
    </v-col>
  </div>
</template>

<style lang="scss" scoped>
.v-sheet {
  background-color: transparent;
}

.product-container {
  display: flex;
}
</style>
