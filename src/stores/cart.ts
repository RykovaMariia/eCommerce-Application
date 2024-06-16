import { getPriceAccordingToFractionDigits } from '@/utils/formatPrice'
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
  getters: {
    totalPrice(state: { cart: Cart | undefined }) {
      return getPriceAccordingToFractionDigits(state.cart?.totalPrice)
    },
  },
})
