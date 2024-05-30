<script setup lang="ts">
import { productService } from '@/services/productService'
import { reactive } from 'vue'
import Button from '@/components/buttons/Button.vue'
import { type Attribute, type ProductData, type ProductItem } from '@/interfaces/productData'
import { ref } from 'vue'
import type { ProductCatalogData } from '@commercetools/platform-sdk'
import NumberInput from '@/components/inputs/NumberInput.vue'

let source = ref(0)

let product: ProductData = reactive({
  description: '',
  name: '',
  images: [],
  variants: [],
})

let attributeValues: Attribute[][] | []

productService
  .getProduct()
  .then((data: ProductCatalogData) => {
    product.description = data.current.description?.['en-GB'] ?? ''
    product.name = data.current.name?.['en-GB']
    const images = data.current.masterVariant.images?.map(({ url }) => {
      return url
    })
    product.images = images ?? ''

    const attributeNames = data.current.masterVariant.attributes?.map(({name}) => name)
    const attributesList = data.current.variants?.map((variant) => {
      return variant.attributes
    }).flat()
    console.warn(attributesList)
    // const masterAttributeNames = data.current.masterVariant.attributes?.map(() => )
    attributeValues = attributeNames?.map((attributeName) => {
      const values: Attribute[] = attributesList?.map((attribute) => {
      if (attribute?.name === attributeName) return attribute.value[0]['key']
      })
      return [...new Set(values)].filter((value) => value).sort()
    }) ?? []
    console.warn(attributeValues)
    const masterVariant: ProductItem = {
      price: data.current.masterVariant.prices?.[0].value.centAmount ?? 0,
      discountPrice: data.current.masterVariant.prices?.[0].discounted?.value.centAmount ?? 0,
    }
    const variants = data.current.variants?.map((variant) => {
      return {
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
      <v-sheet max-width="28rem" class="slider-image">
        <v-sheet rounded="6px" class="slider-image">
          <div class="d-flex fill-height align-center justify-center slider-image">
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
      <v-col>Price: € {{ 100 }}</v-col>
      <v-col v-for="(attributesArray, n) in attributeValues" :key="n">
        <v-item-group selected-class="bg-primary" mandatory>
          <v-container v-if="attributeValues">
            <v-row>
              <v-col v-for="(attribute, i) in attributesArray" :key="i">
                <v-item v-slot="{ selectedClass, toggle }">
                  <v-card :class="['d-flex align-center attribute', selectedClass]" @click="toggle">
                    <div class="flex-grow-1 text-center">
                      {{ attribute }}
                    </div>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-col>
      <NumberInput />
      <Button textContent="Add to cart" />
    </v-col>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.slider-image {
  box-shadow: none;
}

.v-sheet {
  background-color: transparent;
}

.product-container {
  display: flex;
}

.attribute {
  background-color: transparent;
  border: 1px solid constants.$color-primary;
  box-shadow: none;
}
</style>
