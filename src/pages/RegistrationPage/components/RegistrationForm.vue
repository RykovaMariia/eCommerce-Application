<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import DateInput from '@/components/inputs/DateInput.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
</script>

<template>
  <v-form class="registration-form">
    <v-col class="registration-container">
      <v-col class="registration-inner-container">
        <Input :label="InputLabel.FirstName" placeholder="" :type="InputType.Text" />
        <Input :label="InputLabel.LastName" placeholder="" :type="InputType.Text" />
        <v-col>
          <DateInput :label="InputLabel.BirthDate" :type="InputType.Text" />
        </v-col>
        <Input :label="InputLabel.Email" placeholder="user@example.com" :type="InputType.Text" />
        <Input
          :label="InputLabel.Password"
          placeholder=""
          :type="InputType.Password"
          icon="mdi-eye-closed"
        />
      </v-col>
      <v-col class="registration-inner-container">
        <Input :label="InputLabel.Country" :type="InputType.Text" disabled="true" />
        <Input :label="InputLabel.City" :type="InputType.Text" />
        <Input :label="InputLabel.Street" :type="InputType.Text" />
        <Input :label="InputLabel.PostalCode" :type="InputType.Text" />
        <v-col>
          <v-checkbox label="Set as default address" color="primary"></v-checkbox>
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
  padding: 0;

  @media screen and (width <= 1024px) {
    flex-direction: column;
  }
}

.registration-inner-container {
  padding: 0;
}
</style>
