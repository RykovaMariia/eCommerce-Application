import { ClientService, clientService } from '@/api/ClientService'
import { userAuth, type UserAuth } from '@/stores/authStore'
import {
  StorageService,
  localStorageService,
  type LocalStorageState,
} from '@/services/storageService'
import { tokenData } from '@/api/TokenInfo'
import type { UserLoginData } from '@/interfaces/userData'
import router from '@/router'

export class AuthService {
  constructor(
    private clientService: ClientService,
    private localStorageService: StorageService<LocalStorageState>,
    private userAuth: UserAuth,
  ) {}

  login(userData: UserLoginData) {
    try {
      const userClientData = this.clientService
        .getApiRoot(this.clientService.getPasswordFlowClient(userData.email, userData.password))
        .me()
        .get()
        .execute()
      return userClientData
        .then(() => {
          this.userAuth().toogleAuthState()
          this.localStorageService.saveData('token', tokenData.get())
          router.push('/main')
        })
        .catch((error: Error) => {
          console.warn(error.message)
        })
    } catch (e) {
      console.error(e)
    }
  }
}

export const authService = new AuthService(clientService, localStorageService, userAuth)
