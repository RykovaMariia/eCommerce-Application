<script setup lang="ts">
import { productService } from '@/services/productService'
import { reactive } from 'vue'
import Button from '@/components/buttons/Button.vue'
import { type ProductData, type ProductItem } from '@/interfaces/productData'
import { ref } from 'vue'
import type { ProductCatalogData } from '@commercetools/platform-sdk'

let source = ref(0)
console.warn(source.value)

let product: ProductData = reactive({
  description: '',
  name: '',
  images: [],
  variants: []
})

productService
  .getProduct()
  .then((data: ProductCatalogData) => {
    product.description = data.current.description?.['en-GB'] ?? ''
    product.name = data.current.name?.['en-GB']
    const images = data.current.masterVariant.images?.map(({ url }) => {
      return url
    })
    product.images = images ?? ''
    const masterVariant: ProductItem = {
      attribute: data.current.masterVariant.attributes ?? [],
      price: data.current.masterVariant.prices?.[0].value.centAmount ?? 0,
      discountPrice: data.current.masterVariant.prices?.[0].discounted?.value.centAmount ?? 0
    }
    const variants = data.current.variants?.map((variant) => {
      return {  
        attribute: variant.attributes ?? [],
        price: variant.prices?.[0].value.centAmount ?? 0,
        discountPrice: variant.prices?.[0].discounted?.value.centAmount ?? 0,
      }
    })
    product.variants = [masterVariant, ...variants]
  })
  .catch((error: Error) => {
    console.warn(`Error: ${error.message}`, 'warning')
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
              :src="product.images[source] ?? product.images[source]"
              rounded="lg"
            ></v-img>
          </div>
        </v-sheet>
        <v-slide-group v-model="source">
          <v-slide-group-item
            v-for="(n, index) in product.images"
            :source="n"
            :key="n"
            v-slot="{ select }"
          >
            <v-card
              :class="['ma-4']"
              height="100"
              width="100"
              @click="select"
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
      <v-col>Price: € {{ product.variants[0].price / 100 }}</v-col>
      <v-item-group selected-class="bg-primary">
        <v-container>
          <v-row>
            <v-col v-for="(value, n) in product.variants" :key="n" cols="3" md="3">
              <v-item v-slot="{ isSelected, selectedClass, toggle }">
                <v-card :class="['d-flex align-center', selectedClass]" height="30" @click="toggle">
                  <div class="flex-grow-1 text-center">
                    {{ isSelected ? 'Selected' : 'Click Me!' }}
                  </div>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
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
