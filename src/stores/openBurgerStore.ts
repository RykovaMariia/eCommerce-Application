import { defineStore } from 'pinia'

export const openBurgerStore = defineStore('openBurger', {
  state: () => ({
    isOpenBurger: false,
  }),
  actions: {
    toggleOpenState() {
      this.isOpenBurger = !this.isOpenBurger
    },
  },
})
