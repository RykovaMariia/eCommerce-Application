<script setup lang="ts">
  const props = defineProps<{
    text: string
    srcIcon: string
  }>()
</script>

<template>
  <div class="container">
    <v-img :src="srcIcon"></v-img>
    <div>{{ props.text }}</div>
  </div>
</template>

<style lang="scss">
.container {
  border: 1px solid constants.$color-primary;
  border-radius: 10px;
}
</style>