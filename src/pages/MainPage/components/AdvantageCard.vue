<script setup lang="ts">
const props = defineProps<{
  text: string
  iconSrc: string
}>()
</script>

<template>
  <div class="advantages-container">
    <v-img :src="props.iconSrc" class="advantages-image"></v-img>
    <div>{{ props.text }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';
@use '@styles/mixins.scss';

.advantages-container {
  @include mixins.media-tablet {
    min-width: 14rem;
  }

  @include mixins.media-middle {
    min-width: 12rem;
  }

  @include mixins.media-mobile {
    min-width: 10rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 18rem;
  padding: 1.5rem;

  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

.advantages-image {
  width: 3rem;
  height: 3rem;
}
</style>
