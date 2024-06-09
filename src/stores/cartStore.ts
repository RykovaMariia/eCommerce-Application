import { defineStore } from 'pinia'

export const cartStore = defineStore('Cart', {
  state: () => ({
    cartId: '',
    cartVersion: 0,
  }),
  actions: {
    setCartId(cartId: string) {
      this.cartId = cartId
    },
    setVersion(version: number) {
      this.cartVersion = version
    },
  },
})
