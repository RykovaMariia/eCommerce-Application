import { defineStore } from 'pinia'

export const productKeyStore = defineStore('key', {
  state: () => ({
    key: '',
  }),
})
