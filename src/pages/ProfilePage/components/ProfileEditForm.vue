<script setup lang="ts">
import Button from '@components/buttons/Button.vue'
import Input from '@components/inputs/Input.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { ref } from 'vue'
import { formateDate } from '@/utils/dateUtils'
import type { SubmitEventPromise } from 'vuetify'
import { customerService } from '@/services/customerService'
import { useAlertStore } from '@/stores/alert'
import { useUserAuthStore } from '@/stores/userAuth'
import type { ICustomer } from '@/types/writable'

const alert = useAlertStore()

const emit = defineEmits(['updateUser'])
const currentUser = defineModel<ICustomer>('currentUser')

const dateOfBirth = ref(new Date(formateDate(currentUser.value?.dateOfBirth || '')))

async function submit(submitEventPromise: SubmitEventPromise) {
  const { valid } = await submitEventPromise
  if (valid) {
    update()
  }
}

function update() {
  if (!currentUser.value) {
    return
  }

  currentUser.value.dateOfBirth = formateDate(dateOfBirth.value.toDateString())
  customerService
    .update(currentUser.value)
    .then((result) => {
      alert.show('Data updated successfully', 'success')
      useUserAuthStore().customerVersion = result.body.version
      emit('updateUser', result.body)
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}
</script>

<template>
  <v-form v-if="currentUser" class="form" ref="form" @submit.prevent="submit">
    <Input
      :label="InputLabel.Email"
      placeholder="user@example.com"
      :type="InputType.Text"
      v-model="currentUser.email"
      is-validation
    />
    <Input
      :label="InputLabel.FirstName"
      placeholder=""
      :type="InputType.Text"
      v-model="currentUser.firstName"
      class="registration-input"
      is-validation
    />
    <Input
      :label="InputLabel.LastName"
      placeholder=""
      :type="InputType.Text"
      v-model="currentUser.lastName"
      class="registration-input"
      is-validation
    />
    <v-col class="registration-input">
      <DateInput :label="InputLabel.BirthDate" :type="InputType.Text" v-model="dateOfBirth" />
    </v-col>
    <v-col class="col-button-link">
      <Button textContent="Save" color="secondary" buttonType="submit" />
    </v-col>
  </v-form>
</template>
