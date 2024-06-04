import { ClientService } from '@/api/ClientService'

import {
  StorageService,
  localStorageService,
  type LocalStorageState,
} from '@/services/storageService'
import { tokenData } from '@/api/TokenInfo'
import type { UserCustomerDraft, UserLoginData } from '@/interfaces/userData'

export class AuthService {
  constructor(
    private clientService: ClientService,
    private localStorageService: StorageService<LocalStorageState>,
  ) {}

  login(userData: UserLoginData) {
    const userClientData = this.clientService
      .getApiRoot(this.clientService.getPasswordFlowClient(userData.email, userData.password))
      .me()
      .login()
      .post({ body: userData })
      .execute()
    return userClientData.then(() => {
      this.localStorageService.saveData('token', tokenData.get())
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

export const authService = new AuthService(new ClientService(), localStorageService)
