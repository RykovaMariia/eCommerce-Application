<script lang="ts" setup>
import type { CategoryLink, Link, LinkByName } from '@/interfaces/link'

defineProps<{
  menuItems?: Link[] | LinkByName[]
  menuItemsWithSubItems?: CategoryLink[]
  menuTriggerText?: string
  menuTriggerIcon?: string
}>()
</script>

<template>
  <v-menu open-on-hover start>
    <template v-slot:activator="{ props }">
      <div class="account-wrapper" v-bind="props">
        <v-btn icon v-if="menuTriggerIcon">
          {{ menuTriggerText }}
          <v-icon class="menu-icon">{{ menuTriggerIcon }}</v-icon>
        </v-btn>

        <div class="trigger" v-if="menuTriggerText">
          {{ menuTriggerText }}
          <v-icon v-if="menuTriggerIcon" class="menu-icon">{{ menuTriggerIcon }}</v-icon>
        </div>
      </div>
    </template>
    <div class="dropdown">
      <template v-if="menuItems">
        <RouterLink
          class="dropdown-item"
          v-for="item of menuItems"
          :key="item.name"
          :to="item.href"
          >{{ item.name }}</RouterLink
        ></template
      >

      <template v-if="menuItemsWithSubItems">
        <div v-for="item of menuItemsWithSubItems" :key="item.parent.name">
          <RouterLink class="dropdown-item" :to="item.parent.href">{{
            item.parent.name
          }}</RouterLink>
          <div v-for="subitem of item.children" :key="subitem.name" class="dropdown-subitem">
            <RouterLink :to="subitem.href">{{ subitem.name }}</RouterLink>
          </div>
        </div></template
      >
    </div>
  </v-menu>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.account-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
}

.trigger {
  cursor: pointer;

  &:hover {
    color: constants.$color-primary;
  }
}

.dropdown {
  position: absolute;
  z-index: 2;
  top: calc(100% + 2px);
  left: 0;

  overflow: visible;
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: max-content;
  padding: 20px;

  text-transform: capitalize;

  background-color: constants.$color-text-light;
  border: 1px solid constants.$color-primary;
  border-top: none;
  border-radius: 0 0 6px 6px;
}

.dropdown-subitem {
  margin: 1rem 0 1rem 1rem;
}

.menu-icon {
  color: constants.$color-primary;
}
</style>
