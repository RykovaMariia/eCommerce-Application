import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const userAuth = defineStore('user', {
  state: () => ({
    isLoggedIn: !!refreshToken,
    refreshToken: refreshToken ?? '',
  }),

  actions: {
    toggleAuthState() {
      this.isLoggedIn = !this.isLoggedIn
    },
  },
})

export type UserAuth = typeof userAuth
