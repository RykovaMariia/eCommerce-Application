<script setup lang="ts">
import Button from '@/components/buttons/Button.vue'
import { localStorageService } from '@/services/storageService'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { cartApiService } from '@/services/cartApiService'
import { useAlertStore } from '@/stores/alert'

const emit = defineEmits(['updateProduct'])

const { cart } = storeToRefs(useCartStore())
const dialog = ref(false)

function deleteCart() {
  dialog.value = false
  if (cart.value) {
    cartApiService
      .deleteCart({ id: cart.value.id, version: cart.value.version })
      .then(() => {
        cart.value = undefined
        localStorageService.removeData('cartId')
        emit('updateProduct', {
          lineItems: [],
          totalLineItemQuantity: 0,
        })
      })
      .catch((error: Error) => {
        useAlertStore().show(error.message, 'warning')
      })
  }
}
</script>
<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <Button
        btn-variant="tonal"
        color="primary"
        size="large"
        textContent="Clear Shopping Cart"
        v-bind="activatorProps"
      />
    </template>

    <v-card
      prepend-icon="mdi-delete-alert-outline"
      text="Do you really want to clear the entire cart?"
      title="Clear cart"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <Button textContent="Cancel" btnVariant="tonal" color="primary" @click="dialog = false" />

        <Button textContent="Agree" @click="deleteCart" color="primary" btnVariant="outlined" />
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
@use '@styles/constants.scss';

.v-card {
  padding: 1rem 0.5rem;
}

::v-deep(.mdi-delete-alert-outline) {
  color: constants.$color-primary;
}
</style>
