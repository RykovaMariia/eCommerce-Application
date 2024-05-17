import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const userAuth = defineStore('user', {
  state: () => ({
    isLoggined: !!refreshToken,
    refreshToken: refreshToken ?? '',
  }),

  actions: {
    toogleAuthState() {
      this.isLoggined = !this.isLoggined
    },
  },
})

export type UserAuth = typeof userAuth
