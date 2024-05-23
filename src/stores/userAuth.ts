import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const userAuth = defineStore('user', {
  state: () => ({
    isLoggedIn: !!refreshToken,
    refreshToken: refreshToken ?? '',
  }),

  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
      localStorageService.removeData('token')
    },
  },
})

export type UserAuth = typeof userAuth
