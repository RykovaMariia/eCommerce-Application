<script setup lang="ts">
const props = defineProps<{
  text: string
  Icon: object
}>()
</script>

<template>
  <div class="advantages-container">
    <Icon />
    <div>{{ props.text }}</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/constants.scss';

.advantages-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 15rem;
  padding: 1.5rem;

  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}
</style>
