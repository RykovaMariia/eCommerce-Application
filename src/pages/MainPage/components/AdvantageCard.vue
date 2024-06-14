<script setup lang="ts">
const props = defineProps<{
  text: string
  iconSrc: string
}>()
</script>

<template>
  <div class="advantages__container">
    <v-img :src="props.iconSrc" class="advantages__image"></v-img>
    <div>{{ props.text }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.advantages {
&__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 15rem;
  padding: 1.5rem;

  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}

&__image {
  width: 3rem;
  height: 3rem;
}
}
</style>
