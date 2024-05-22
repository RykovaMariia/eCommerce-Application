<script setup lang="ts">
interface Item {
  title: string
  disabled: boolean
  href: string
}
const props = defineProps<{
  items: Item[]
}>()
</script>

<template>
  <v-breadcrumbs :items="props.items"></v-breadcrumbs>
</template>
