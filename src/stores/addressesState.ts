import { defineStore } from 'pinia'

export const isTheSameAddress = defineStore('setAsTheSameAddress', {
  state: () => ({
    isNotSame: true,
  }),
  actions: {
    toggleState() {
      this.isNotSame = !this.isNotSame
    },
  },
})
