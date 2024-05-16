<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import { COUNTRY } from '@/constants/constants'
import AddressFields from './AddressFields.vue'
import type { UserRegistrationData } from '@/interfaces/userData'
import { useAddressStore } from '@/stores/addressStateStore/userAddress'
import { isTheSameAddress } from '@/stores/addressStateStore/addressesState'

const userRegistrationData = {
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  password: '',
  country: COUNTRY,
  addresses: [],
  isSame: false,
}

const userData: UserRegistrationData = reactive({ ...userRegistrationData })

const isSameAddress = isTheSameAddress()

const store = useAddressStore()
store.$subscribe((_, state) => {
  userData.addresses = []
  if (isSameAddress.isNotSame === false) {
    userData.addresses = [state.addressList[0]]
  } else {
    userData.addresses = state.addressList
  }
  store.$reset
  isSameAddress.$reset
})

function submit() {
  console.warn(isSameAddress.isNotSame)
  console.warn(userData);
}

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
            @setInput="(v) => (userData.birthDate = v)"
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
          <Checkbox label="Use the billing address as the shipping address" v-model="userData.isSame" @click="() => isSameAddress.toggleState()"/>
        </v-col>
        <v-col class="address-container">
          <v-col style="padding: 0;">
            <v-col>
              <h2 class="address-title">Billing address</h2>
            </v-col>
            <AddressFields />
          </v-col>
          <v-col style="padding: 0;">
            <v-col>
              <h2 class="address-title">Shipping address</h2>
            </v-col>
            <div v-if="isSameAddress.isNotSame">
              <AddressFields />
            </div>
            <div v-else>
              <v-col>Billing and shipping addresses are the same</v-col>
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
    flex-direction: column
  }
}

.address-title {
  font-size: 1.5rem;
  color: constants.$color-secondary;
}
</style>
