<script setup lang="ts">
import { productService } from '@/services/productService'
import { computed, reactive, type Ref } from 'vue'
import Button from '@/components/buttons/Button.vue'
import { type ProductData, type ProductItem } from '@/interfaces/productData'
import { ref } from 'vue'
import type { ProductCatalogData, ProductVariant } from '@commercetools/platform-sdk'
import NumberInput from '@/components/inputs/NumberInput.vue'
import { getUniqueValues } from '@/utils/getUniqueValues'

const source = ref(0)
const multiplier = ref(1)
const discountIsActive = ref(false)

let product: ProductData = reactive({
  description: '',
  name: '',
  images: [],
  variants: [],
})

let attributeValues: string[][]
let masterAttributeNames: string[] = []
let isProductDataLoaded = ref(false)

function retrieveVariantsData({ attributes, prices }: ProductVariant) {
  return {
    attributes: attributes?.map((value) => value.value[0].key) ?? [],
    price: prices?.[0].value.centAmount ?? 0,
    discountPrice: prices?.[0].discounted?.value.centAmount ?? 0,
  }
}

productService
  .getProduct()
  .then(({ current: { description, masterVariant, name, variants } }: ProductCatalogData) => {
    product.description = description?.['en-GB'] ?? ''
    product.name = name?.['en-GB']
    product.images = masterVariant.images?.map(({ url }) => url) ?? []
    masterAttributeNames = masterVariant.attributes?.map(({ name }) => name) ?? []
    const variantAttributes = variants?.map((variant) => variant.attributes).flat()
    const attributesList = [masterVariant.attributes, ...variantAttributes].flat()
    attributeValues = masterAttributeNames.map((attributeName) => {
      const keys: string[] = attributesList
        .map((attribute) => {
          if (attribute?.name === attributeName) {
            return attribute.value[0]['key']
          }
        })
        .filter((value) => value)
      return getUniqueValues(keys)
    })

    const mainVariant: ProductItem = retrieveVariantsData(masterVariant)

    const allVariants = variants?.map(retrieveVariantsData)
    product.variants = [mainVariant, ...allVariants]

    isProductDataLoaded.value = true
  })
  .catch((error: Error) => {
    console.warn(`Error: ${error.message}`, 'warning')
  })

const selectedVariants: Ref<string[]> = ref([])

const setVariant = (value: string, index: number) => {
  selectedVariants.value[index] = value
}

const formPrice = ({price, discountPrice}: ProductItem) => {
  const formattedPrice = ((price / 100) * multiplier.value).toFixed(2)
  const formattedDiscountPrice = ((discountPrice / 100) * multiplier.value).toFixed(2)
  const resultFormattedPrice = discountPrice ? {formattedPrice, formattedDiscountPrice} : {formattedPrice}
  discountPrice ? discountIsActive.value = true : discountIsActive.value = false
  return resultFormattedPrice
}

const price = computed(() => {
  const variant = product.variants.find(
    ({attributes}) =>
      attributes[0] === selectedVariants.value[0] &&
      attributes[1] === selectedVariants.value[1],
  )
  const resultPrice = variant ? formPrice(variant) : formPrice(product.variants[0])
  return resultPrice
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
      <h1>{{ product.name }}</h1>
      <div>{{ product.description }}</div>
      <div v-if="masterAttributeNames.length">
        <div v-for="(attributesArray, n) in attributeValues" :key="n" class="value-wrapper">
          <div class="attribute-name">{{ masterAttributeNames[n] }}:</div>
          <v-item-group selected-class="selected-group" mandatory>
            <div class="value-container">
              <div v-for="(attribute, i) in attributesArray" :key="i">
                <v-item v-slot="{ selectedClass, toggle }">
                  <v-card
                    :class="['value-container attribute', selectedClass]"
                    @click="
                      setVariant(attribute, n);
                      toggle?.()
                    "
                  >
                    <div class="d-flex flex-grow-1 text-center">
                      {{ attribute }}
                    </div>
                  </v-card>
                </v-item>
              </div>
            </div>
          </v-item-group>
        </div>
      </div>
      <div class="price-wrapper">
        <NumberInput v-model="multiplier" />
        <div v-if="isProductDataLoaded" class="price-wrapper">
          <div class="price_discount" v-if="price.formattedDiscountPrice">€ {{ price.formattedDiscountPrice }}</div>
          <div class="price" :class="{'price_line-through': discountIsActive}">€ {{ price.formattedPrice }}</div>
        </div>
      </div>
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
  padding: 0.2rem;
  background-color: transparent;
  border: 1px solid constants.$color-primary;
  box-shadow: none;
}

.attribute-name {
  text-transform: capitalize;
}

.selected-group {
  border: 2px solid constants.$color-primary;
}

.price-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 0;
}

.value-wrapper {
  padding: 1rem 0;
}

.value-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.price {
  font-size: 1.5rem;
  color: constants.$color-text-dark;
  opacity: 0.7;

  &_discount {
    font-size: 1.5rem;
    color: constants.$color-sale;
  }

  &_line-through {
    text-decoration: line-through;
  }
}
</style>
