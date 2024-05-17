import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const userAuth = defineStore('user', {
  state: () => ({
    isLogined: !!refreshToken,
    refreshToken: refreshToken ?? '',
  }),

  actions: {
    toogleAuthState() {
      this.isLogined = !this.isLogined
    },
  },
})

export type UserAuth = typeof userAuth
