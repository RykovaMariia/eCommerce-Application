<script setup lang="ts">
import { ref } from 'vue'
import Tab from '@components/tab/Tab.vue'
import AddressList from '@/pages/ProfilePage/components/AddressList.vue'
import type { Customer } from '@commercetools/platform-sdk'
import { computed } from 'vue'

const tab = ref('billing')

const currentUser = defineModel<Customer>('currentUser')

const addressBillingItems = computed(() => {
  return currentUser.value
    ? currentUser.value.addresses.filter((item) =>
        currentUser.value?.billingAddressIds?.includes(item.id || ''),
      )
    : []
})

const addressShippingItems = computed(() => {
  return currentUser.value
    ? currentUser.value.addresses.filter((item) =>
        currentUser.value?.shippingAddressIds?.includes(item.id || ''),
      )
    : []
})

const addressShippingDefault = computed(() => {
  return currentUser.value ? currentUser.value?.defaultShippingAddressId || '' : ''
})

const addressBillingDefault = computed(() => {
  return currentUser.value ? currentUser.value?.defaultBillingAddressId || '' : ''
})
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
          <AddressList :items="addressBillingItems" :defaultAddress="addressBillingDefault" />
        </v-col>
      </v-tabs-window-item>

      <v-tabs-window-item value="shipping">
        <v-col>
          <AddressList :items="addressShippingItems" :defaultAddress="addressShippingDefault" />
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
