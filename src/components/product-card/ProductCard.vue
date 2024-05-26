<script setup lang="ts">
import Button from '../buttons/Button.vue'
defineProps<{
  src?: string
  name?: string
  description?: string
  price?: number
  discountedPrice?: number
}>()
</script>
<template>
  <v-card elevation="0" max-width="290" variant="text" class="product-card">
    <v-img height="340" :src="src" cover></v-img>
    <v-card-title>{{ name }}</v-card-title>
    <v-card-subtitle opacity="1">{{ description }} </v-card-subtitle>
    <v-card-text v-if="!discountedPrice" class="price">€{{ price }}</v-card-text>
    <v-card-text v-if="discountedPrice" class="price discount"
      >€{{ discountedPrice }} <span class="line-through">€{{ price }}</span></v-card-text
    >
    <v-card-actions>
      <Button textContent="Add to card" />
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.product-card {
  cursor: pointer;
}

.v-img {
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.v-card-title {
  padding: 0.5rem 0;
  white-space: normal;
  font-size: 1.15rem;
}

.v-card-subtitle {
  padding: 0;
}

.v-card-text {
  padding: 0.5rem 0;
  font-size: 1.15rem;
}

.price {
  font-weight: 500;
}

.discount {
  color: constants.$color-sale;
}

.line-through {
  color: constants.$color-text-dark;
  opacity: 0.8;
  text-decoration: line-through;
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
