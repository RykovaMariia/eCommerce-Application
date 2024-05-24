<script setup lang="ts">
import { ref } from 'vue'
import Tab from '@components/tab/Tab.vue'
import AddressList from '@/pages/ProfilePage/components/AddressList.vue'

const tab = ref('billing')

const addressBillingItems = ref([{ text: 'Address1' }, { text: 'Address2' }, { text: 'Address3' }])

const addressShippingItems = ref([{ text: 'Address4' }, { text: 'Address5' }, { text: 'Address6' }])
</script>
<template>
  <v-col>
    <v-tabs v-model="tab" grow>
      <Tab text="Billing" value="billing" />
      <Tab text="Shipping" value="shipping" />
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="billing">
        <v-col>
          <AddressList :items="addressBillingItems" />
        </v-col>
      </v-tabs-window-item>

      <v-tabs-window-item value="shipping">
        <v-col>
          <AddressList :items="addressShippingItems" />
        </v-col>
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
