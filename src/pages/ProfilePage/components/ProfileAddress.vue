<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Tab from '@components/tab/Tab.vue'
import AddressList from '@/pages/ProfilePage/components/AddressList.vue'
import type { Customer } from '@commercetools/platform-sdk'
import { computed } from 'vue'
import AddAddressForm from './AddAddressForm.vue'
import type { Address } from '@commercetools/platform-sdk'
import { COUNTRY } from '@/constants/constants'

const typeAddress = ref('billing')

let isOpenForm = ref(false)

let address: Ref<Address> = ref({
  country: COUNTRY,
  city: '',
  streetName: '',
  postalCode: '',
})

let currentUser = defineModel<Customer>('currentUser')

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

function openForm(item?: Address) {
  isOpenForm.value = !isOpenForm.value
  if (item) address.value = item
}

function updateUserInfo(user: Customer) {
  currentUser.value = user
  isOpenForm.value = !isOpenForm.value
}
</script>
<template>
  <v-col>
    <v-tabs v-model="typeAddress" grow>
      <Tab text="Billing" value="billing" />
      <Tab text="Shipping" value="shipping" />
    </v-tabs>

    <v-tabs-window v-model="typeAddress">
      <v-tabs-window-item value="billing">
        <v-col>
          <AddressList
            :items="addressBillingItems"
            :defaultAddress="addressBillingDefault"
            @editAddress="openForm($event)"
          />
        </v-col>
      </v-tabs-window-item>

      <v-tabs-window-item value="shipping">
        <v-col>
          <AddressList
            :items="addressShippingItems"
            :defaultAddress="addressShippingDefault"
            @editAddress="openForm($event)"
          />
        </v-col>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-col>

  <v-col>
    <a @click.prevent="openForm()">Add new</a>
  </v-col>

  <AddAddressForm
    v-if="isOpenForm"
    :typeAddress="typeAddress"
    v-model:address="address"
    @updateUserInfo="updateUserInfo($event)"
  />
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.v-list-item__overlay {
  opacity: 0;
}

a {
  cursor: pointer;
  font-size: 1.2rem;
  color: constants.$color-secondary;
  text-decoration: underline;
}
</style>
