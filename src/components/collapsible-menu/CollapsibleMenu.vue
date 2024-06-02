<script lang="ts" setup>
import type { CategoryLink, Link, LinkByName } from '@/interfaces/link'
import { ref } from 'vue'

const isOpenMenu = ref([])

const { menuTriggerText, items } = defineProps<{
  menuTriggerText: string
  items?: Link[] | LinkByName[]
  itemsWithSubItems?: CategoryLink[]
}>()
</script>

<template>
  <v-list v-model:opened="isOpenMenu">
    <v-list-group value="items">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" :title="menuTriggerText" variant="plain"></v-list-item>
      </template>
      <template v-if="items">
        <v-list-item
          v-for="{ name: text, href } in items"
          :key="text"
          :title="text"
          :value="text"
          :to="href"
          variant="plain"
        ></v-list-item>
      </template>
      <template v-if="itemsWithSubItems">
        <div v-for="item in itemsWithSubItems" :key="item.parent.name">
          <v-list-item
            :title="item.parent.name"
            :value="item.parent.name"
            :to="item.parent.href"
            variant="plain"
          ></v-list-item>
          <div v-for="subitem in item.children" :key="subitem.name" class="subitems">
            <v-list-item
              :title="subitem.name"
              :value="subitem.name"
              :to="subitem.href"
              variant="plain"
            ></v-list-item>
          </div>
        </div>
      </template>
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

.subitems {
  padding-left: 1rem;
}

::v-deep(.v-list-item-title) {
  text-transform: capitalize;
}
</style>
