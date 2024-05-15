<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const data = defineModel()
</script>

<template>
  <v-checkbox :label="props.label" color="primary" v-model="data"></v-checkbox>
</template>
