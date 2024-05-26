<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { computed, reactive, ref } from 'vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import { COUNTRY, yearToShow } from '@/constants/constants'
import type { UserCustomerDraft } from '@/interfaces/userData'
import { authService } from '@/services/authService'
import { formateDate } from '@/utils/dateUtils'
import { alertStore } from '@/stores/alertStore'
import router from '@/router'
import { userAuth } from '@/stores/userAuth'
import type { SubmitEventPromise } from 'vuetify'
import AutocompleteInput from '@/components/inputs/AutocompleteInput.vue'

const alert = alertStore()

const defaultShipping = ref(false)
const defaultBilling = ref(false)

const addressShipping = reactive({
  country: COUNTRY,
  city: '',
  streetName: '',
  postalCode: '',
})
const addressBilling = reactive({
  country: COUNTRY,
  city: '',
  streetName: '',
  postalCode: '',
})

const form = ref(null)

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
  billingAddresses: [],
  shippingAddresses: [],
})

const currentDate = new Date()
const dateOfBirth = ref(new Date(yearToShow, currentDate.getMonth(), currentDate.getDate()))

async function submit(submitEventPromise: SubmitEventPromise) {
  if (isTheSame.value) {
    addressShipping.city = addressBilling.city
    addressShipping.streetName = addressBilling.streetName
    addressShipping.postalCode = addressBilling.postalCode
  }
  const { valid } = await submitEventPromise
  if (valid) signup()
}

function signup() {
  if (defaultBilling.value) {
    userData.defaultBillingAddress = 0
  }
  if (isTheSame.value) {
    userData.addresses.push(addressBilling)
    userData.billingAddresses = userData.shippingAddresses = [0]
    if (defaultShipping.value) {
      userData.defaultShippingAddress = 0
    }
  } else {
    userData.addresses.push(addressBilling, addressShipping)
    userData.billingAddresses = [0]
    userData.shippingAddresses = [1]
    if (defaultShipping.value) {
      userData.defaultShippingAddress = 1
    }
  }
  userData.dateOfBirth = formateDate(dateOfBirth.value.toDateString())

  authService
    .signup(userData)
    .then(() => {
      userAuth().login()
      alert.show('User is registered', 'success')
      router.replace({ name: 'main' })
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}
</script>

<template>
  <v-form class="registration-form" @submit.prevent="submit" ref="form">
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
          <DateInput :label="InputLabel.BirthDate" :type="InputType.Text" v-model="dateOfBirth" />
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
        <v-col>
          <AutocompleteInput
            :label="InputLabel.Country"
            :items="[COUNTRY]"
            type="text"
            class="registration-input"
          />
        </v-col>
        <Checkbox
          label="Use the billing address as the shipping address"
          v-model="isTheSame"
          @click="toggleState()"
        />
        <v-col class="address-container">
          <v-col class="address-wrapper">
            <v-col>
              <h2 class="address-title">{{ title }}</h2>
            </v-col>
            <Checkbox
              label="Use as default billing address"
              v-model="defaultBilling"
              @click="!defaultBilling"
            />
            <div v-if="isTheSame">
              <Checkbox
                label="Use as default shipping address"
                v-model="defaultShipping"
                @click="!defaultShipping"
              />
            </div>
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
          <v-col class="address-shipping-wrapper">
            <div v-if="!isTheSame">
              <v-col>
                <h2 class="address-title">Shipping address</h2>
              </v-col>
              <Checkbox
                label="Use as default shipping address"
                v-model="defaultShipping"
                @click="!defaultShipping"
              />
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
    <v-col class="col-button-link">
      <Button textContent="Sign Up" classes="secondary" buttonType="submit" size="large" />
      <v-row>
        <span>Already have an account?</span>
        <RouterLink class="link_redirect" to="/login">Login</RouterLink>
      </v-row>
    </v-col>
  </v-form>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

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
