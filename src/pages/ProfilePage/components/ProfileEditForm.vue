<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import type { Customer } from '@commercetools/platform-sdk'

const currentUser = defineModel<Customer>('currentUser')
</script>

<template>
  <v-form v-if="currentUser" class="login-form" @submit.prevent="">
    <Input
      :label="InputLabel.Email"
      placeholder="user@example.com"
      :type="InputType.Text"
      v-model="currentUser.email"
    />
    <Input
      :label="InputLabel.FirstName"
      placeholder=""
      :type="InputType.Text"
      v-model="currentUser.firstName"
      class="registration-input"
    />
    <Input
      :label="InputLabel.LastName"
      placeholder=""
      :type="InputType.Text"
      v-model="currentUser.lastName"
      class="registration-input"
    />
    <v-col class="registration-input">
      <DateInput
        :label="InputLabel.BirthDate"
        :type="InputType.Text"
        v-model="currentUser.dateOfBirth"
      />
    </v-col>
    <v-col class="col-button-link">
      <Button textContent="Save" classes="secondary" buttonType="submit" />
    </v-col>
  </v-form>
</template>
