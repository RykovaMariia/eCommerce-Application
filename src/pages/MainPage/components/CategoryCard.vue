<script setup lang="ts">
const props = defineProps<{
  categoryTitle: string
  imageSource: string
}>()
</script>

<template>
  <v-card elevation="0">
    <v-img class="category-card" :src="props.imageSource" cover aspect-ratio="1.2">
      <div class="category-title">{{ props.categoryTitle }}</div>
    </v-img>
  </v-card>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.category-card {
  display: flex;
  align-items: end;

  min-width: 13rem;
  height: 100%;

  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.category-title {
  @include mixins.media-middle {
    padding: 0.2rem;
    font-size: 0.7rem;
  }

  max-width: 50%;
  height: 10%;
  padding: 0.3rem;

  font-size: 1rem;
  color: constants.$color-text-light;
  text-align: center;
  text-transform: capitalize;

  background-color: constants.$color-primary;
  border-top-right-radius: 10px;
}
</style>
