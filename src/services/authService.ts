import { ClientService, clientService } from '@/services/clientService'

import {
  StorageService,
  localStorageService,
  type LocalStorageState,
} from '@/services/storageService'
import { tokenData } from '@/services/tokenService'
import type { UserCustomerDraft, UserLoginData } from '@/interfaces/userData'

const MergeWithExistingCustomerCart = 'MergeWithExistingCustomerCart'

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
      userData.anonymousCartSignInMode = MergeWithExistingCustomerCart
      userData.updateProductData = true
    }

    return this.clientService
      .getRoot(this.clientService.getPasswordFlowClient(userData.email, userData.password))
      .me()
      .login()
      .post({ body: userData })
      .execute()

      .then(() => {
        this.localStorageService.saveData('token', tokenData.get())
        localStorageService.removeData('anonymousId')
        this.clientService.setApiRoot()
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
      .then(() => {
        this.login(userData)
      })
  }
}

export const authService = new AuthService(clientService, localStorageService)
