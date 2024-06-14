<script setup lang="ts">
import { FULL_PERCENTAGE } from '@/constants/constants'
import Button from '@components/buttons/Button.vue'
import { localStorageService } from '@/services/storageService'
import { computed } from 'vue'
import Price from '@components/price/Price.vue'
import router from '@/router'
import { favoritesService } from '@/services/favoritesService'
import { useFavoritesStore } from '@/stores/favorites'
import type { ShoppingListLineItem } from '@commercetools/platform-sdk'

const props = defineProps<{
  loading: boolean
  src: string
  name: string
  description: string
  price: number
  discountedPrice: number
  productSlug: string
  productId: string
  isAddedInCart?: boolean
  isAddedInFavorites?: boolean
}>()

const emit = defineEmits([
  'addProductToCart',
  'addProductToFavorites',
  'deleteProductFromFavorites',
])

function getDiscountPercentage(price: number, discountedPrice: number) {
  return FULL_PERCENTAGE - Math.ceil((discountedPrice * FULL_PERCENTAGE) / price)
}

const toProduct = () => {
  localStorageService.saveData('productId', props.productId)
  router.push({ name: 'productId', params: { productId: props.productSlug } })
}

const color = computed(() => {
  return !props.isAddedInCart ? 'secondary' : 'primary'
})

const textContent = computed(() => {
  return !props.isAddedInCart ? 'Add to cart' : 'Added to cart'
})

const to = computed(() => {
  return props.isAddedInCart ? '/cart' : undefined
})

const heartIcon = computed(() => {
  return props.isAddedInFavorites ? 'mdi-heart' : 'mdi-heart-outline'
})

const addToFavorites = computed(() => {
  return !props.isAddedInFavorites
    ? emit('addProductToFavorites', props.productId)
    : emit(
        'deleteProductFromFavorites',
        favoritesService.getLineIdByProduct(
          useFavoritesStore().favorites?.lineItems as ShoppingListLineItem[],
          props.productId,
          1,
        ),
      )
})

const addToCart = computed(() => {
  return !props.isAddedInCart ? emit('addProductToCart', props.productId) : undefined
})
</script>
<template>
  <v-col>
    <v-card
      :disabled="loading"
      :loading="loading"
      elevation="0"
      max-width="290"
      variant="text"
      class="product-card"
      @click="toProduct"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="secondary"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-img height="340" :src="src" cover></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle opacity="1">{{ description }} </v-card-subtitle>
      <v-card-text
        ><Price
          :isWithDiscount="!!discountedPrice"
          :price="price"
          :priceWithDiscount="discountedPrice"
        />
      </v-card-text>
      <div class="discount" v-if="discountedPrice">
        -{{ getDiscountPercentage(price, discountedPrice) }}%
      </div>
      <v-card-actions class="favorites">
        <v-btn icon @click.stop="() => addToFavorites">
          <v-icon color="primary">{{ heartIcon }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <Button :disabled="loading" :color :textContent :to @click="() => addToCart" />
  </v-col>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.v-col {
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  flex-grow: 0;
  gap: 0.6rem;
  align-items: flex-start;
  justify-content: space-between;
}

.product-card {
  cursor: pointer;

  &:hover {
    color: constants.$color-text-dark;

    ::v-deep(.v-img__img--cover) {
      transform: scale(1.1);
    }
  }
}

::v-deep(.v-card__overlay) {
  display: none;
}

::v-deep(.v-img__img--cover) {
  transform: scale(1);
  transition: all 0.6s ease 0s;
}

.v-img {
  flex: 0 0 auto;
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.v-card-title {
  padding: 0.5rem 0;
  font-size: 1.15rem;
  white-space: normal;
}

.v-card-subtitle {
  flex: 1 0 auto;
  padding: 0;
}

.v-card-text {
  padding: 0.5rem 0;
  font-size: 1.15rem;
}

.discount {
  position: absolute;
  top: 1px;
  left: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.3rem;
  height: 4.1rem;
  padding-top: 10px;

  color: constants.$color-text-light;

  background-color: constants.$color-sale;
  border-radius: 0 0 10px 10px;
}

.favorites {
  position: absolute;
  top: 0.4rem;
  right: 0.4rem;
}

.favorites .v-btn {
  padding: 0;
  background-color: constants.$color-text-light;
  border-radius: 100%;
}

.v-btn {
  padding: 0.5rem 2rem;
  font-size: 0.8rem;
  border-radius: 10px;
}
</style>
