<script setup lang="ts">
import TheInput from '@components/inputs/TheInput.vue'
import TheButton from '@components/buttons/TheButton.vue'
import { getMaxTime } from '@/utils/max-time'
import { chooseRules } from '@/utils/choose-rules'
</script>

<template>
  <v-form class="registration-form">
    <v-col class="registration-container">
      <v-col class="registration-inner-container">
        <TheInput label="First name" placeholder="" type="text" />
        <TheInput label="Last name" placeholder="" type="text" />
        <v-col>
          <v-date-input
            label="Birth date"
            variant="outlined"
            prepend-icon=""
            :max="getMaxTime()"
            year="2000"
            type="text"
            :rules="chooseRules('text', 'Birth date')"
          ></v-date-input>
        </v-col>
        <TheInput label="Email" placeholder="user@example.com" type="text" />
        <TheInput label="Password" placeholder="" type="password" icon="mdi-eye-closed" />
      </v-col>
      <v-col class="registration-inner-container">
        <TheInput label="United Kingdom" type="text" disabled="true" />
        <TheInput label="City" type="text" />
        <TheInput label="Street" type="text" />
        <TheInput label="Postal code" type="text" />
        <v-col>
          <v-checkbox label="Set as default address" color="primary"></v-checkbox>
        </v-col>
      </v-col>
    </v-col>
    <TheButton textContent="Sign Up" classes="secondary" buttonType="submit" size="large" />
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
