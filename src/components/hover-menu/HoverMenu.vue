<script lang="ts" setup>
interface MenuItem {
  text: string
  href: string
}

defineProps<{
  menuItems: MenuItem[]
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
          <v-icon class="menu-icon">{{ menuTriggerIcon }}</v-icon>
        </div>
      </div>
    </template>
    <div class="dropdown">
      <a class="dropdown-item" v-for="item of menuItems" :key="item.href" :href="item.href">{{
        item.text
      }}</a>
    </div>
  </v-menu>
</template>

<style lang="scss" scoped>
@use '../../styles/constants.scss';

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

  background-color: constants.$color-text-light;
  border: 1px solid constants.$color-primary;
  border-top: none;
  border-radius: 0 0 6px 6px;
}

.menu-icon {
  color: constants.$color-primary;
}
</style>
