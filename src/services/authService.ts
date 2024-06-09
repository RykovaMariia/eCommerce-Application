import { ClientService, clientService } from '@/api/ClientService'

import {
  StorageService,
  localStorageService,
  type LocalStorageState,
} from '@/services/storageService'
import { tokenData } from '@/api/TokenInfo'
import type { UserCustomerDraft, UserLoginData } from '@/interfaces/userData'

const mergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart'

export class AuthService {
  constructor(
    private clientService: ClientService,
    private localStorageService: StorageService<LocalStorageState>,
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

    const userClientData = this.clientService
      .getRoot(this.clientService.getPasswordFlowClient(userData.email, userData.password))
      .me()
      .login()
      .post({ body: userData })
      .execute()

    return userClientData.then(() => {
      this.localStorageService.saveData('token', tokenData.get())
      localStorageService.removeData('anonymousId')
      this.clientService.setApiRoot()
    })
  }

  signup(userData: UserCustomerDraft) {
    const userClientData = this.clientService
      .getApiRoot()
      .me()
      .signup()
      .post({
        body: userData,
      })
      .execute()
    return userClientData.then(() => {
      return this.login(userData)
    })
  }
}

export const authService = new AuthService(clientService, localStorageService)
