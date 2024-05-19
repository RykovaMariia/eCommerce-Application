import { ClientService, clientService } from '@/api/ClientService'

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

  async login(userData: UserLoginData) {
    const userClientData = this.clientService
      .getApiRoot(this.clientService.getPasswordFlowClient(userData.email, userData.password))
      .me()
      .get()
      .execute()
    return userClientData.then(() => {
      this.localStorageService.saveData('token', tokenData.get())
    })
  }

  async signup(userData: UserCustomerDraft) {
    const userClientData = this.clientService
      .getApiRoot()
      .me()
      .signup()
      .post({
        body: userData,
      })
      .execute()
    return userClientData
      .then(() => {
        return this.login(userData)
      })
      .catch((error: Error) => {
        console.warn(error.message)
      })
  }

  user() {
    try {
      const userClientData = this.clientService.getApiRoot().me().get().execute()
      return userClientData
        .then((data) => {
          console.warn(data.body)
        })
        .catch((error: Error) => {
          console.warn(error.message)
        })
    } catch (e) {
      console.error(e)
    }
  }
}

export const authService = new AuthService(clientService, localStorageService)
