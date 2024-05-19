<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { computed, reactive, ref } from 'vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import { COUNTRY } from '@/constants/constants'
import type { Address, UserCustomerDraft } from '@/interfaces/userData'
import { authService } from '@/services/authService'
import { formateDate } from '@/utils/maxTime'
import { alertStore } from '@/stores/alertStore'

const alert = alertStore()

const address: { addressShipping: Address; addressBilling: Address } = {
  addressShipping: {
    country: COUNTRY,
    city: '',
    streetName: '',
    postalCode: '',
  },
  addressBilling: {
    country: COUNTRY,
    city: '',
    streetName: '',
    postalCode: '',
  },
}

const addressShipping = reactive({ ...address.addressShipping })
const addressBilling = reactive({ ...address.addressBilling })

const isTheSame = ref(false)

function toggleState() {
  isTheSame.value = !isTheSame.value
}

const title = computed(() => {
  return isTheSame.value ? 'Billing / shipping address' : 'Billing address'
})

const userData: UserCustomerDraft = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  password: '',
  addresses: [],
})

function signup() {
  if (!userData.email || !userData.password) return
  else {
    if (isTheSame.value) {
      userData.addresses.push(addressBilling)
      userData.defaultBillingAddress = 0
      userData.defaultShippingAddress = 0
    } else {
      userData.addresses.push(addressBilling, addressShipping)
      userData.defaultBillingAddress = 0
      userData.defaultShippingAddress = 1
    }
    userData.dateOfBirth = formateDate(userData.dateOfBirth)

    authService
      .signup(userData)
      .then(() => {
        alert.setTrue()
        alert.$patch((state) => {
          state.message = 'User is registered'
          state.type = 'success'
        })
      })
      .catch((error: Error) => {
        alert.setTrue()
        alert.$patch((state) => {
          state.message = error.message
          state.type = 'warning'
        })
      })
  }
}
</script>

<template>
  <v-form class="registration-form" @submit.prevent="signup">
    <v-col class="registration-container">
      <v-col class="registration-inner-container">
        <Input
          :label="InputLabel.FirstName"
          placeholder=""
          :type="InputType.Text"
          v-model="userData.firstName"
          class="registration-input"
        />
        <Input
          :label="InputLabel.LastName"
          placeholder=""
          :type="InputType.Text"
          v-model="userData.lastName"
          class="registration-input"
        />
        <v-col class="registration-input">
          <DateInput
            :label="InputLabel.BirthDate"
            :type="InputType.Text"
            @setInput="(value) => (userData.dateOfBirth = value)"
          />
        </v-col>
        <Input
          :label="InputLabel.Email"
          placeholder="user@example.com"
          :type="InputType.Text"
          v-model="userData.email"
          class="registration-input"
        />
        <Input
          :label="InputLabel.Password"
          placeholder=""
          :type="InputType.Password"
          v-model="userData.password"
          icon="mdi-eye-closed"
          class="registration-input"
        />
      </v-col>
      <v-col class="registration-inner-container">
        <Input
          :label="InputLabel.Country"
          :type="InputType.Text"
          disabled
          class="registration-input"
        />
        <v-col>
          <Checkbox
            label="Use the billing address as the shipping address"
            v-model="isTheSame"
            @click="toggleState()"
          />
        </v-col>
        <v-col class="address-container">
          <v-col class="address-wrapper">
            <v-col>
              <h2 class="address-title">{{ title }}</h2>
            </v-col>
            <Input :label="InputLabel.City" :type="InputType.Text" v-model="addressBilling.city" />
            <Input
              :label="InputLabel.Street"
              :type="InputType.Text"
              v-model="addressBilling.streetName"
            />
            <Input
              :label="InputLabel.PostalCode"
              :type="InputType.Text"
              v-model="addressBilling.postalCode"
            />
          </v-col>
          <v-col style="padding: 0">
            <div v-if="!isTheSame">
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
                v-model="addressShipping.streetName"
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

.address-wrapper {
  padding: 0;
}

.registration-input {
  width: 50%;

  @media screen and (width <= 1024px) {
    width: 100%;
  }
}
</style>
