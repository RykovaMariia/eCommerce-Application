import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'
import { clientService } from '@/services/clientService'
import { tokenData } from '@/services/tokenService'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const userAuth = defineStore('user', {
  state: () => ({
    isLoggedIn: !!refreshToken,
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
      clientService.setApiRoot()
    },
  },
})

export type UserAuth = typeof userAuth
