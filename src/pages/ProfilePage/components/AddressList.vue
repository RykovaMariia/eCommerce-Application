<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  items: { text: string }[]
}>()

const selected = ref(0)

function handleItemClick(selected: { text: string }) {
  console.warn(selected.text)
}
</script>

<template>
  <v-list v-model:selected="selected" bg-color="transparent" color="primary">
    <v-list-item
      class="item"
      v-for="(item, i) in props.items"
      :key="i"
      :value="item"
      color="primary"
    >
      <v-list-item-title>
        <div @click="handleItemClick(item)">{{ item.text }}</div>
      </v-list-item-title>

      <template v-slot:append>
        <v-icon icon="mdi-grease-pencil" size="small"></v-icon>
        <v-icon icon="mdi-delete" size="small"></v-icon>
      </template>
    </v-list-item>
  </v-list>
</template>
