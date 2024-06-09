<script setup lang="ts">
import { addressService } from '@/services/addressService'
import type { Address, MyCustomerUpdateAction } from '@commercetools/platform-sdk'
import { alertStore } from '@/stores/alertStore'
import { userAuth } from '@/stores/userAuth'

const alert = alertStore()

defineProps<{
  items: Address[]
  defaultAddress: string
}>()

const typeAddress = defineModel<string>('typeAddress')
const actions: MyCustomerUpdateAction[] = []

const emit = defineEmits(['editAddress', 'updateUserInfo'])

function removeAddress(address: Address) {
  if (!address) return
  addressService
    .remove(address)
    .then((result) => {
      alert.show('Address removed', 'success')
      if (result?.body) {
        userAuth().customerVersion = result.body.version
        emit('updateUserInfo', result.body)
      }
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}

function setAsDefault(address: Address) {
  if (!address) return
  const setTypeAction =
    typeAddress?.value === 'billing' ? 'setDefaultBillingAddress' : 'setDefaultShippingAddress'
  actions.push({ action: setTypeAction, addressId: address.id })

  addressService
    .setDefault(actions)
    .then((result) => {
      alert.show('Address set as Default', 'success')
      if (result?.body) {
        userAuth().customerVersion = result.body.version
        emit('updateUserInfo', result.body)
      }
    })
    .catch((error: Error) => {
      alert.show(`Error: ${error.message}`, 'warning')
    })
}
</script>

<template>
  <v-list bg-color="transparent" color="primary">
    <v-list-item class="item" v-for="(item, i) in items" :key="i" :value="item" color="primary">
      <template v-slot:prepend>
        <v-icon color="primary" icon="mdi-map-marker-radius" size="small" class="icon"></v-icon>
      </template>
      <v-list-item-title>
        <div class="text">{{ item.city }}, {{ item.streetName }}, {{ item.postalCode }}</div>
      </v-list-item-title>

      <template v-slot:append>
        <div class="icons" color="primary">
          <v-chip v-if="item.id === defaultAddress" color="primary"> Default </v-chip>
          <v-chip
            color="secondary"
            size="small"
            @click="setAsDefault(item)"
            v-if="item.id !== defaultAddress"
          >
            Set as default
          </v-chip>
          <v-icon
            icon="mdi-grease-pencil"
            size="small"
            class="icon"
            @click.prevent="emit('editAddress', item)"
          ></v-icon>
          <v-icon
            icon="mdi-delete"
            size="small"
            class="icon"
            @click.prevent="removeAddress(item)"
          ></v-icon>
        </div>
      </template>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">
@use '@/styles/constants.scss';
@use '@/styles/mixins.scss';

::v-deep(.v-list-item__prepend > .v-icon ~ .v-list-item__spacer) {
  width: 0.5rem;
}

@include mixins.media-middle {
  .v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    display: flex;
    align-items: flex-start;
    padding: 1px;
  }

  ::v-deep(.v-list-item__content) {
    align-self: flex-start;
    width: 100%;
  }

  ::v-deep(.v-list-item__append) {
    align-self: flex-end;
  }

  ::v-deep(.v-list-item__prepend) {
    align-self: flex-start;
  }

  .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.item {
  border-bottom: 1px solid constants.$color-border-opacity;
}

.icons {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  color: constants.$color-text-dark;

  .icon {
    &:hover {
      transform: scale(1.2);
      color: constants.$color-secondary;
    }
  }
}
</style>
