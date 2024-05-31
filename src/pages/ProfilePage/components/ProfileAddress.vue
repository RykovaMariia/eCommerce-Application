<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Tab from '@components/tab/Tab.vue'
import AddressList from '@/pages/ProfilePage/components/AddressList.vue'
import type { Customer } from '@commercetools/platform-sdk'
import { computed } from 'vue'
import AddAddressForm from './AddressForm.vue'
import type { Address } from '@commercetools/platform-sdk'
import { COUNTRY } from '@/constants/constants'
import { TypeAction } from '@/enums/typeAction'

const typeAddress = ref('billing')

let isOpenForm = ref(false)

let typeAction = ref(TypeAction.Add)

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

function openFormForAddress(item?: Address) {
  isOpenForm.value = true
  if (item) {
    address.value = item
    typeAction.value = TypeAction.Edit
  } else typeAction.value = TypeAction.Add
}

function updateUserInfo(user: Customer) {
  currentUser.value = user
  isOpenForm.value = false
}

function cancel() {
  isOpenForm.value = false
  address.value = {
    country: COUNTRY,
    city: '',
    streetName: '',
    postalCode: '',
  }
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
            v-model:typeAddress="typeAddress"
            :defaultAddress="addressBillingDefault"
            @editAddress="openFormForAddress($event)"
            @updateUserInfo="updateUserInfo($event)"
          />
        </v-col>
      </v-tabs-window-item>

      <v-tabs-window-item value="shipping">
        <v-col>
          <AddressList
            :items="addressShippingItems"
            v-model:typeAddress="typeAddress"
            :defaultAddress="addressShippingDefault"
            @editAddress="openFormForAddress($event)"
            @updateUserInfo="updateUserInfo($event)"
          />
        </v-col>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-col>

  <v-col v-if="!isOpenForm">
    <a @click.prevent="openFormForAddress()">Add new</a>
  </v-col>

  <AddAddressForm
    v-if="isOpenForm"
    :typeAddress="typeAddress"
    :typeAction="typeAction"
    v-model:address="address"
    :addressBillingDefault="addressBillingDefault"
    :addressShippingDefault="addressBillingDefault"
    @updateUserInfo="updateUserInfo($event)"
    @cancel="cancel()"
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
