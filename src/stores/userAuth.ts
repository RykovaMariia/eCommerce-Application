import { defineStore } from 'pinia'
import { localStorageService } from '@/services/storageService'
import { clientService } from '@/services/clientService'
import { tokenData } from '@/services/tokenService'
import { useCartStore } from './cart'

const refreshToken = localStorageService.getData('token')?.refreshToken

export const useUserAuthStore = defineStore('user', {
  state: () => ({
    isLoggedIn: !!refreshToken,
    customerVersion: 0,
  }),

  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      useCartStore().clearCart()
      this.isLoggedIn = false
      localStorageService.removeData('token')
      localStorageService.removeData('cartId')
      localStorageService.removeData('anonymousId')

      tokenData.clear()
      clientService.setApiRoot()
    },
  },
})

export type UserAuth = typeof useUserAuthStore
