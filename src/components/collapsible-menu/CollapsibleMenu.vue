<script lang="ts" setup>
import { ref } from 'vue'
import type { Link } from '../core/BurgerMenu.vue'

const isOpenMenu = ref([])

const { menuTriggerText, items } = defineProps<{
  menuTriggerText: string
  items: Link[]
}>()
</script>

<template>
  <v-list v-model:opened="isOpenMenu">
    <v-list-group value="items">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" :title="menuTriggerText" variant="plain"></v-list-item>
      </template>
      <v-list-item
        v-for="{ text, href } in items"
        :key="text"
        :title="text"
        :value="text"
        :to="href"
        variant="plain"
      ></v-list-item>
    </v-list-group>
  </v-list>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.v-list-item--density-default.v-list-item--one-line {
  cursor: pointer;
  padding: 1rem 2rem;

  .mdi-chevron-down,
  .mdi-chevron-up {
    color: constants.$color-primary;
  }
}
</style>
