import { defineStore } from 'pinia'

export const useBurgerStore = defineStore('openBurger', {
  state: () => ({
    isOpenBurger: false,
  }),
  actions: {
    toggleOpenState() {
      this.isOpenBurger = !this.isOpenBurger
    },
  },
})
