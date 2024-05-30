<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import Button from '@components/buttons/Button.vue'
import Checkbox from '@/components/checkbox/Checkbox.vue'
import { COUNTRY } from '@/constants/constants'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import AutocompleteInput from '@/components/inputs/AutocompleteInput.vue'
import { reactive, ref } from 'vue'

const isTheSame = ref(false)

function toggleState() {
  isTheSame.value = !isTheSame.value
}

const defaultAddress = ref(false)

const address = reactive({
  country: COUNTRY,
  city: '',
  streetName: '',
  postalCode: '',
})
</script>

<template>
  <v-form class="address-form" @submit.prevent="" ref="form">
    <v-col class="registration-inner-container">
      <v-col>
        <AutocompleteInput
          :label="InputLabel.Country"
          :items="[COUNTRY]"
          type="text"
          class="registration-input"
        />
        <Checkbox
          label="Use as default billing address"
          v-model="defaultAddress"
          @click="!defaultAddress"
        />
      </v-col>
      <v-col class="address-container">
        <v-col class="address-wrapper">
          <Input :label="InputLabel.City" :type="InputType.Text" v-model="address.city" />
          <Input :label="InputLabel.Street" :type="InputType.Text" v-model="address.streetName" />
          <Input
            :label="InputLabel.PostalCode"
            :type="InputType.Text"
            v-model="address.postalCode"
          />
        </v-col>
      </v-col>
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
