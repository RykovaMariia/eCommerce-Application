import { ClientService, clientService } from '@/services/clientService'

import {
  StorageService,
  localStorageService,
  type LocalStorageState,
} from '@/services/storageService'
import { tokenData } from '@/services/tokenService'
import type { UserCustomerDraft, UserLoginData } from '@/interfaces/userData'
import { useCartStore } from '@/stores/cart'

const mergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart'

export class AuthService {
  constructor(
    private clientService: ClientService,
    private localStorageService: StorageService<LocalStorageState>,
    private cartStore: typeof useCartStore,
  ) {}

  login(userData: UserLoginData) {
    const cartId = localStorageService.getData('cartId')
    const anonymousId = localStorageService.getData('anonymousId')

    if (cartId && anonymousId) {
      userData.anonymousCartId = cartId
      userData.anonymousId = anonymousId
      userData.anonymousCartSignInMode = mergeWithExistingCustomerCart
      userData.updateProductData = true
    }

    return this.clientService
      .getRoot(this.clientService.getPasswordFlowClient(userData.email, userData.password))
      .me()
      .login()
      .post({ body: userData })
      .execute()

      .then(({ body }) => {
        this.localStorageService.saveData('token', tokenData.get())
        localStorageService.removeData('anonymousId')
        this.clientService.setApiRoot()
        this.cartStore().setCart(body.cart)
      })
  }

  signup(userData: UserCustomerDraft) {
    return this.clientService
      .getApiRoot()
      .me()
      .signup()
      .post({
        body: userData,
      })
      .execute()
      .then(({ body }) => {
        this.login(userData)
        this.cartStore().setCart(body.cart)
      })
  }
}

export const authService = new AuthService(clientService, localStorageService, useCartStore)
