<script setup lang="ts">
import Input from '@components/inputs/Input.vue'
import { InputLabel } from '@/enums/inputLabel'
import { InputType } from '@/enums/inputType'
import { reactive } from 'vue'
import type { Address } from '@/interfaces/userData';
import { useAddressStore } from '@/stores/addressStateStore/userAddress';

const addressDataObj = {
  city: '',
  street: '',
  postalCode: '',
}
const addressData: Address = reactive({...addressDataObj})

const store = useAddressStore()
store.$patch((state) => {
  state.addressList.push(addressData)
  state.address = addressData
})
</script>

<template>
  <Input :label="InputLabel.City" :type="InputType.Text" v-model="addressData.city" />
  <Input :label="InputLabel.Street" :type="InputType.Text" v-model="addressData.street" />
  <Input
    :label="InputLabel.PostalCode"
    :type="InputType.Text"
    v-model="addressData.postalCode"
  />
</template>