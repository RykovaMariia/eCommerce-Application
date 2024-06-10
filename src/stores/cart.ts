import type { Cart } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('Cart', {
  state: (): { cart: Cart | undefined } => ({
    cart: undefined,
  }),
  actions: {
    setCart(cart: Cart) {
      this.cart = cart
    },
  },
})
