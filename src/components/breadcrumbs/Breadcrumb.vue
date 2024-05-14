<script setup lang="ts">
interface IItem {
  title: string
  disabled: boolean
  href: string
}
const props = defineProps<{
  items: IItem[]
}>()
</script>

<template>
  <v-breadcrumbs :items="props.items"></v-breadcrumbs>
</template>

<style scoped lang="scss">
@use '@styles/constants.scss';

.v-breadcrumbs {
  color: constants.$color-text-breadcrumbs;
}
</style>
