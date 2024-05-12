import { defineStore } from 'pinia'

export const userAuth = defineStore('user', {
  state: () => ({
    isLogined: false,

    userCredentials: {
      email: '',
      password: '',
    },
  }),
  actions: {
    toogleAuthState() {
      this.isLogined = !this.isLogined
    },
  },
})
