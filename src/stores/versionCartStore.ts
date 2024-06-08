import { defineStore } from 'pinia'

export const versionCartStore = defineStore('cart', {
  state: () => ({
    customerVersion: 0,
  }),
})
