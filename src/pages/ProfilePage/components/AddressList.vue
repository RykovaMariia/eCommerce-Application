<script setup lang="ts">
import { addressService } from '@/services/addressService'
import type { Address, Customer } from '@commercetools/platform-sdk'
import { alertStore } from '@/stores/alertStore'
import { userAuth } from '@/stores/userAuth'

const alert = alertStore()

defineProps<{
  items: Address[]
  defaultAddress: string
}>()

const emit = defineEmits({
  editAddress(item: Address) {
    return item
  },
  updateUserInfo(currentUser: Customer) {
    return currentUser
  },
})

function removeAddress(address: Address) {
  console.warn(address)
  if (address) {
    addressService
      .remove(address)
      .then((result) => {
        alert.show('Address removed', 'success')
        if (result?.body) {
          userAuth().customerVersion = result?.body.version
          emit('updateUserInfo', result?.body)
        }
      })
      .catch((error: Error) => {
        alert.show(`Error: ${error.message}`, 'warning')
      })
  }
}
</script>

<template>
  <v-list bg-color="transparent" color="primary">
    <v-list-item class="item" v-for="(item, i) in items" :key="i" :value="item" color="primary">
      <v-list-item-title>
        <div>{{ item.city }}, {{ item.streetName }} {{ item.postalCode }}</div>
      </v-list-item-title>

      <template v-slot:append>
        <div class="icons" color="primary">
          <v-chip v-if="item.id === defaultAddress" color="primary"> Default </v-chip>
          <v-icon
            icon="mdi-grease-pencil"
            size="small"
            @click.prevent="emit('editAddress', item)"
          ></v-icon>
          <v-icon icon="mdi-delete" size="small" @click.prevent="removeAddress(item)"></v-icon>
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

.item {
  border-bottom: 1px solid constants.$color-border-opacity;
}

.icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: constants.$color-text-dark;
}
</style>
