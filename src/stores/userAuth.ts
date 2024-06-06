import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'
import { tokenData } from '@/api/TokenInfo'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const userAuth = defineStore('user', {
  state: () => ({
    isLoggedIn: !!refreshToken,
    refreshToken: refreshToken ?? '',
    customerVersion: 0,
  }),

  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      this.isLoggedIn = false
      localStorageService.removeData('token')
      tokenData.clear()
    },
  },
})

export type UserAuth = typeof userAuth
