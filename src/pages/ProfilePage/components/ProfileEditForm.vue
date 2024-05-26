<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import type { Customer } from '@commercetools/platform-sdk'
import { ref } from 'vue'
import { formateDate } from '@/utils/dateUtils'
import type { SubmitEventPromise } from 'vuetify'
import type { Writeable } from '@/interfaces/writeable'
import { customerService } from '@/services/customerService'
import { alertStore } from '@/stores/alertStore'
import { userAuth } from '@/stores/userAuth'

const alert = alertStore()

const currentUser = defineModel<Writeable<Customer>>('currentUser')

const dateOfBirth = ref(new Date(formateDate(currentUser.value?.dateOfBirth || '')))

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) update()
}

function update() {
  if (currentUser.value) {
    currentUser.value.dateOfBirth = formateDate(dateOfBirth.value.toDateString())
    customerService
      .update(currentUser.value)
      .then((result) => {
        alert.show(`Data updated successfully`, 'success')
        userAuth().customerVersion = result.body.version
      })
      .catch((error: Error) => {
        alert.show(`Error: ${error.message}`, 'warning')
      })
  }
}
</script>

<template>
  <v-form v-if="currentUser" class="login-form" ref="form" @submit.prevent="submit">
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
      <DateInput :label="InputLabel.BirthDate" :type="InputType.Text" v-model="dateOfBirth" />
    </v-col>
    <v-col class="col-button-link">
      <Button textContent="Save" classes="secondary" buttonType="submit" />
    </v-col>
  </v-form>
</template>