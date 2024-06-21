<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isWithDiscount: boolean
  price: number
  priceWithDiscount?: number
}>()

const priceDiscountClass = computed(() => {
  return props.isWithDiscount ? 'price_discount' : 'price'
})

const priceClass = computed(() => {
  return props.isWithDiscount ? 'price_line-through' : 'price'
})
</script>

<template>
  <span v-if="isWithDiscount" :class="priceDiscountClass">€{{ priceWithDiscount }}&nbsp;</span>
  <span :class="priceClass">€{{ price }}</span>
</template>
<style scoped lang="scss">
@use '@/styles/constants.scss';

.price {
  flex-grow: 0;
  font-weight: 500;

  &_discount {
    color: constants.$color-sale;
  }

  &_line-through {
    color: constants.$color-text-dark;
    text-decoration: line-through;
    opacity: 0.8;
  }
}
</style>
