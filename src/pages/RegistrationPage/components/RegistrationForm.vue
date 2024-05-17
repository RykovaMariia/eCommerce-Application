<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { computed, reactive, watch } from 'vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import { COUNTRY } from '@/constants/constants'
import type { Address, UserRegistrationData } from '@/interfaces/userData'
import { isTheSameAddress } from '@/stores/addressStateStore/addressesState'

const isSameAddress = isTheSameAddress()

const address: { addressShipping: Address; addressBilling: Address } = {
  addressShipping: {
    city: '',
    street: '',
    postalCode: '',
  },
  addressBilling: {
    city: '',
    street: '',
    postalCode: '',
  },
}

const addressShipping = reactive({ ...address.addressShipping })
const addressBilling = reactive({ ...address.addressBilling })

const userData: UserRegistrationData = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: '',
  country: COUNTRY,
  addresses: {
    addressShipping,
    addressBilling,
  },
  isSame: false,
})

watch(isSameAddress, (indicator) => {
  if (indicator.isNotSame) {
    userData.addresses.addressShipping = addressShipping
  } else {
    userData.addresses.addressShipping = addressBilling
  }
})

function submit() {
  console.warn(userData)
}

const title = computed(() => {
  return isSameAddress.isNotSame ? 'Billing address' : 'Billing / shipping address'
})
</script>

<template>
  <v-form class="registration-form" @submit.prevent="submit">
    <v-col class="registration-container">
      <v-col class="registration-inner-container">
        <Input
          :label="InputLabel.FirstName"
          placeholder=""
          :type="InputType.Text"
          v-model="userData.firstName"
        />
        <Input
          :label="InputLabel.LastName"
          placeholder=""
          :type="InputType.Text"
          v-model="userData.lastName"
        />
        <v-col>
          <DateInput
            :label="InputLabel.BirthDate"
            :type="InputType.Text"
            @setInput="(v: string) => (userData.birthDate = v)"
          />
        </v-col>
        <Input
          :label="InputLabel.Email"
          placeholder="user@example.com"
          :type="InputType.Text"
          v-model="userData.email"
        />
        <Input
          :label="InputLabel.Password"
          placeholder=""
          :type="InputType.Password"
          v-model="userData.password"
          icon="mdi-eye-closed"
        />
      </v-col>
      <v-col class="registration-inner-container">
        <Input :label="InputLabel.Country" :type="InputType.Text" disabled />
        <v-col>
          <Checkbox
            label="Use the billing address as the shipping address"
            v-model="userData.isSame"
            @click="() => isSameAddress.toggleState()"
          />
        </v-col>
        <v-col class="address-container">
          <v-col style="padding: 0">
            <v-col>
              <h2 class="address-title">{{ title }}</h2>
            </v-col>
            <Input :label="InputLabel.City" :type="InputType.Text" v-model="addressBilling.city" />
            <Input
              :label="InputLabel.Street"
              :type="InputType.Text"
              v-model="addressBilling.street"
            />
            <Input
              :label="InputLabel.PostalCode"
              :type="InputType.Text"
              v-model="addressBilling.postalCode"
            />
          </v-col>
          <v-col style="padding: 0">
            <div v-if="isSameAddress.isNotSame">
              <v-col>
                <h2 class="address-title">Shipping address</h2>
              </v-col>
              <Input
                :label="InputLabel.City"
                :type="InputType.Text"
                v-model="addressShipping.city"
              />
              <Input
                :label="InputLabel.Street"
                :type="InputType.Text"
                v-model="addressShipping.street"
              />
              <Input
                :label="InputLabel.PostalCode"
                :type="InputType.Text"
                v-model="addressShipping.postalCode"
              />
            </div>
          </v-col>
        </v-col>
      </v-col>
    </v-col>
    <Button textContent="Sign Up" classes="secondary" buttonType="submit" size="large" />
  </v-form>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';

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

.address-container {
  display: flex;
  padding: 0;

  @media screen and (width <= 768px) {
    flex-direction: column;
  }
}

.address-title {
  font-size: 1.5rem;
  color: constants.$color-secondary;
}
</style>
