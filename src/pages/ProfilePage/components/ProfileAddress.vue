<script setup lang="ts">
import { ref, type Ref } from 'vue'
import Tab from '@components/tab/Tab.vue'
import AddressList from '@/pages/ProfilePage/components/AddressList.vue'
import Button from '@components/buttons/Button.vue'
import type { Customer } from '@commercetools/platform-sdk'
import { computed } from 'vue'
import AddAddressForm from './AddressForm.vue'
import type { Address } from '@commercetools/platform-sdk'
import { COUNTRY } from '@/constants/constants'
import { TypeAction } from '@/enums/typeAction'

const typeAddress = ref('billing')

const isOpenForm = ref(false)

const typeAction = ref(TypeAction.Add)

const address: Ref<Address> = ref({
  country: COUNTRY,
  city: '',
  streetName: '',
  postalCode: '',
})

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
}
</script>
<template>
  <v-col>
    <v-tabs v-model="typeAddress" grow color="primary">
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
    <Button
      textContent="Add new"
      classes="secondary"
      buttonType="button"
      @click.prevent="openFormForAddress()"
    />
  </v-col>

  <AddAddressForm
    v-if="isOpenForm"
    :address
    :typeAddress
    :typeAction
    :addressBillingDefault
    :addressShippingDefault
    :addressesBilling="addressBillingItems"
    :addressesShipping="addressShippingItems"
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
