<script setup lang="ts">
import { ref } from 'vue'
import Tab from '@components/tab/Tab.vue'

const tab = ref('option-2')

const selected = ref([])
const items = ref([
  { text: 'Address1', icon: 'mdi-grease-pencil', iconDelete: 'mdi-delete' },
  { text: 'Address2', icon: 'mdi-grease-pencil', iconDelete: 'mdi-delete' },
  { text: 'Address3', icon: 'mdi-grease-pencil', iconDelete: 'mdi-delete' },
])
</script>
<template>
  <v-col>
    <v-tabs v-model="tab" grow>
      <Tab text="Billing" value="option-1" />
      <Tab text="Shipping" value="option-2" />
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="option-1">
        <v-col>
          <v-list v-model:selected="selected" bg-color="transparent" color="primary">
            <v-list-item
              class="item"
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" size="small"></v-icon>
                <v-icon :icon="item.iconDelete" size="small"></v-icon>
              </template>

              <div :text="item.text">{{ item.text }}</div>
            </v-list-item>
          </v-list>
        </v-col>
      </v-tabs-window-item>

      <v-tabs-window-item value="option-2">
        <v-col>text2</v-col>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-col>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.v-list-item__overlay {
  opacity: 0;
}
</style>
