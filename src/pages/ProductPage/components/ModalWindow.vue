<script setup lang="ts">
const props = defineProps<{
  activator: string
  productImages: string[]
}>()
</script>

<template>
  <v-overlay
    open-on-click
    :activator="props.activator"
    scroll-strategy="block"
    class="d-flex justify-center align-center mx-auto"
  >
    <v-sheet>
      <v-card :width="$vuetify.display.smAndDown ? '90svw' : '60svw'">
        <v-carousel :height="$vuetify.display.smAndDown ? '80svh' : '90svh'">
          <v-carousel-item
            v-for="url in productImages"
            :key="url"
            :src="url"
            cover
          ></v-carousel-item>
        </v-carousel>
      </v-card>
    </v-sheet>
  </v-overlay>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.v-carousel__controls {
  height: 2rem;
  color: constants.$color-primary;
  background: transparent;
}

.v-btn--icon.v-btn--density-default {
  height: 0;
}
</style>
