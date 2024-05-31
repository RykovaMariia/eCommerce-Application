<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import { COUNTRY } from '@/constants/constants'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import AutocompleteInput from '@/components/inputs/AutocompleteInput.vue'
import { computed, ref } from 'vue'
import type { Address, Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk'
import type { SubmitEventPromise } from 'vuetify'
import { addressService } from '@/services/addressService'
import { alertStore } from '@/stores/alertStore'
import { userAuth } from '@/stores/userAuth'
import { reactive } from 'vue'
import { TypeAction } from '@/enums/typeAction'

const props = defineProps<{
  typeAddress: string
  typeAction: string
}>()

const form = ref()

const alert = alertStore()

const address = defineModel<Address>('address')

const isTheSame = ref(false)

const actions: MyCustomerUpdateAction[] = reactive([])

const titleCheckbox = computed(() => {
  return props.typeAddress === 'billing'
    ? 'Use the billing address as the shipping address'
    : 'Use the shipping address as the billing address'
})

const titleForm = computed(() => {
  return props.typeAction === TypeAction.Add ? 'Add New Address' : 'Edit Address'
})

const resetForm = () => {
  if (form.value) {
    form.value.reset()
  }
}

function toggleState() {
  isTheSame.value = !isTheSame.value
}

const emit = defineEmits({
  updateUserInfo(currentUser: Customer) {
    return currentUser
  },
  cancel() {
    return true
  },
})

const defaultShipping = ref(false)
const defaultBilling = ref(false)

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) {
    if (props.typeAction === TypeAction.Add) createAddress()
    if (props.typeAction === TypeAction.Edit && address.value) updateAddress(address.value)
  }
}

function createAddress() {
  if (address.value) {
    addressService
      .create(address.value)
      .then((result) => {
        const addressResult = result.body
          ? result?.body?.addresses?.find(
              (item) =>
                item.streetName === address.value?.streetName &&
                item.postalCode === address.value?.postalCode &&
                item.streetNumber === address.value?.streetNumber,
            )
          : ''

        if (addressResult && addressResult.id) {
          const addressId = addressResult.id

          if (defaultBilling.value) {
            actions.push({ action: 'setDefaultBillingAddress', addressId })
          }
          if (defaultShipping.value) {
            actions.push({ action: 'setDefaultShippingAddress', addressId })
          }
          if (isTheSame.value) {
            actions.push({ action: 'addBillingAddressId', addressId })
            actions.push({ action: 'addShippingAddressId', addressId })
          } else {
            const setTypeAction =
              props.typeAddress === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId'
            actions.push({ action: setTypeAction, addressId })
          }

          addressService.setTypeAddress(actions, result.body.version).then((result) => {
            alert.show('Address created', 'success')

            if (result?.body) {
              userAuth().customerVersion = result?.body.version
              emit('updateUserInfo', result?.body)
              resetForm()
            }
          })
        }
      })
      .catch((error: Error) => {
        alert.show(`Error: ${error.message}`, 'warning')
      })
  }
}

function updateAddress(address: Address) {
  console.warn(address)
  if (address) {
    addressService
      .update(address)
      .then((result) => {
        alert.show('Address updated', 'success')
        if (result?.body) {
          userAuth().customerVersion = result?.body.version
          emit('updateUserInfo', result?.body)
          resetForm()
        }
      })
      .catch((error: Error) => {
        alert.show(`Error: ${error.message}`, 'warning')
      })
  }
}
</script>

<template>
  <v-form v-if="address" class="address-form" @submit.prevent="submit" ref="form">
    <v-col class="title">{{ titleForm }}</v-col>
    <v-col class="registration-inner-container">
      <v-col>
        <Checkbox
          :label="titleCheckbox"
          v-model="isTheSame"
          @click="toggleState()"
          density="compact"
        />
      </v-col>
      <v-col>
        <AutocompleteInput
          :label="InputLabel.Country"
          :items="[COUNTRY]"
          type="text"
          v-model="address.country"
          class="registration-input"
        />
      </v-col>
      <v-col class="address-container">
        <v-col class="address-wrapper">
          <Checkbox
            v-if="props.typeAddress === 'billing'"
            label="Use as default billing address"
            v-model="defaultBilling"
            @click="!defaultBilling"
          />
          <Checkbox
            v-if="props.typeAddress === 'shipping'"
            label="Use as default shipping address"
            v-model="defaultShipping"
            @click="!defaultShipping"
          />
          <Input :label="InputLabel.City" :type="InputType.Text" v-model="address.city" />
          <Input :label="InputLabel.Street" :type="InputType.Text" v-model="address.streetName" />
          <Input
            :label="InputLabel.PostalCode"
            :type="InputType.Text"
            v-model="address.postalCode"
          />
        </v-col>
      </v-col>
      <v-col class="col-button-link">
        <Button textContent="Save" classes="secondary" buttonType="submit" />
        <Button
          textContent="Cansel"
          classes="secondary"
          buttonType="button"
          @click="emit('cancel')"
        />
      </v-col>
    </v-col>
  </v-form>
</template>
<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.title {
  font-size: 1.5rem;
  color: constants.$color-secondary;
}

.col-button-link {
  display: flex;
  gap: 2rem;
  align-items: center;
  width: 100%;
}

.v-row {
  @include mixins.media-mobile {
    font-size: 0.8rem;
  }
  gap: 0.5rem;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.registration-container {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.registration-inner-container {
  padding: 0;
}

.address-form {
  border: 1px solid constants.$color-primary;
}

.address-container {
  @include mixins.media-middle {
    flex-direction: column;
  }
  display: flex;
  padding: 0;
}

.address-title {
  font-size: 1.5rem;
  color: constants.$color-secondary;
}

.address-wrapper {
  padding: 0;
}

.registration-input {
  width: 50%;

  @media screen and (width <= 1024px) {
    width: 100%;
  }
}

.address-shipping-wrapper {
  padding: 0;
}
</style>
