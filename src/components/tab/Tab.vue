<script setup lang="ts">
const props = defineProps<{
  value: string
  text?: string
  prependIcon?: string
}>()
</script>

<template>
  <v-tab :value="props.value" :text="props.text" :prependIcon="props.prependIcon"> </v-tab>
</template>
