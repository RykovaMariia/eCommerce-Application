<script setup lang="ts">
import Button from '../buttons/Button.vue'
defineProps<{
  src: string
  name: string
  description: string
  price: number
  discountedPrice: number
}>()

function getDiscountPercentage(price: number = 0, discountedPrice: number = 0) {
  return 100 - Math.ceil((discountedPrice * 100) / price)
}
</script>
<template>
  <v-card elevation="0" max-width="290" variant="text" class="product-card">
    <v-img height="340" :src="src" cover></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle opacity="1">{{ description }} </v-card-subtitle>
    <v-card-text
      ><span class="price_discount" v-if="discountedPrice">€{{ discountedPrice / 100 }}&nbsp;</span>
      <span :class="discountedPrice ? 'line-through' : 'price'">€{{ price / 100 }}</span>
    </v-card-text>
    <v-card-actions>
      <Button textContent="Add to card" />
    </v-card-actions>
    <div class="discount" v-if="discountedPrice">
      -{{ getDiscountPercentage(price, discountedPrice) }}%
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.product-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
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
    text-decoration: none;
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

.v-card-actions {
  padding: 0;
}

.v-btn {
  padding: 0.5rem 2rem;
  font-size: 0.8rem;
  border-radius: 10px;
}
</style>
