<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { UserCustomerDraft } from '@/interfaces/userData'

const userData: UserCustomerDraft = reactive({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  password: '',
  addresses: [],
})

const setInput = (value: string) => {
  return (userData.dateOfBirth = value)
}
</script>

<template>
  <v-form class="login-form">
    <Input
      :label="InputLabel.Email"
      placeholder="user@example.com"
      :type="InputType.Text"
      v-model="userData.email"
    />
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
      <DateInput :label="InputLabel.BirthDate" :type="InputType.Text" @setInput="setInput" />
    </v-col>
    <v-col class="col-button-link">
      <Button textContent="Save" classes="secondary" buttonType="submit" />
    </v-col>
  </v-form>
</template>
