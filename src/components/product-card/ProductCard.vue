<script setup lang="ts">
import { FULL_PERCENTAGE } from '@/constants/constants'
import Button from '@components/buttons/Button.vue'
import { localStorageService } from '@/services/storageService'

const props = defineProps<{
  src: string
  name: string
  description: string
  price: number
  discountedPrice: number
  productSlug: string
  productKey: string
}>()

const href = { name: 'productId', params: { productId: props.productSlug } }

function getDiscountPercentage(price: number, discountedPrice: number) {
  return FULL_PERCENTAGE - Math.ceil((discountedPrice * FULL_PERCENTAGE) / price)
}
const passProductKey = () => {
  localStorageService.saveData('productKey', props.productKey)
}
</script>
<template>
  <v-col>
    <v-card
      elevation="0"
      max-width="290"
      variant="text"
      class="product-card"
      :to="href"
      @click="passProductKey"
    >
      <v-img height="340" :src="src" cover></v-img>
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle opacity="1">{{ description }} </v-card-subtitle>
      <v-card-text
        ><span class="price_discount" v-if="discountedPrice"
          >€{{ discountedPrice / FULL_PERCENTAGE }}&nbsp;</span
        >
        <span :class="discountedPrice ? 'line-through' : 'price'"
          >€{{ price / FULL_PERCENTAGE }}</span
        >
      </v-card-text>
      <div class="discount" v-if="discountedPrice">
        -{{ getDiscountPercentage(price, discountedPrice) }}%
      </div>
    </v-card>
    <Button textContent="Add to card" />
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

.price {
  flex-grow: 0;
  font-weight: 500;

  &_discount {
    color: constants.$color-sale;
  }
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

.line-through {
  color: constants.$color-text-dark;
  text-decoration: line-through;
  opacity: 0.8;
}

.v-btn {
  padding: 0.5rem 2rem;
  font-size: 0.8rem;
  border-radius: 10px;
}
</style>
