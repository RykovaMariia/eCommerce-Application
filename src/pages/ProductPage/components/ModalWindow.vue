<script setup lang="ts">
const props = defineProps<{
  activator: string,
  productImages: string | string[]
}>()
</script>

<template>
  <v-overlay open-on-click :activator="props.activator" scroll-strategy="block" class="d-flex fill-height justify-center align-center">
    <v-card width="500">
      <v-carousel>
        <v-carousel-item v-for="(url, i) in productImages" :key="i" :src="url" cover></v-carousel-item>
      </v-carousel>
    </v-card>
  </v-overlay>
</template>

<style lang="scss">
@use '@/styles/constants.scss';

.v-carousel__controls {
  height: 2rem;
  background: transparent;
  color: constants.$color-primary;
}

.v-btn--icon.v-btn--density-default {
  height: 0;
}
</style>