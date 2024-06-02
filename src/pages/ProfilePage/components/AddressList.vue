<script setup lang="ts">
import type { Address } from '@commercetools/platform-sdk'

defineProps<{
  items: Address[]
  defaultAddress: string
}>()
</script>

<template>
  <v-list bg-color="transparent" color="primary">
    <v-list-item class="item" v-for="(item, i) in items" :key="i" :value="item" color="primary">
      <v-list-item-title>
        <div>{{ item.city }}, {{ item.streetName }} {{ item.postalCode }}</div>
      </v-list-item-title>

      <template v-slot:append>
        <div class="icons" color="primary">
          <v-chip v-if="item.id === defaultAddress" color="primary"> Default </v-chip>
          <v-icon icon="mdi-grease-pencil" size="small"></v-icon>
          <v-icon icon="mdi-delete" size="small"></v-icon>
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: constants.$color-text-dark;
}
</style>
