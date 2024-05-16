import { clientService } from '@/api/ClientService'
import { userAuth } from '@/stores/auth-store'
import { localStorageService } from './storage-service'
import { tokenData } from '@/api/TokenInfo'
import type { UserLoginData } from '@/interfaces/userData'

export class AuthService {
  login(userData: UserLoginData) {
    console.warn(userData.email)
    console.warn(userData.password)
    try {
      const userClientData = clientService
        .getApiRoot(clientService.getPasswordFlowClient(userData.email, userData.password))
        .me()
        .get()
        .execute()
      userClientData
        .then((data) => {
          console.warn(data.body)
          userAuth().toogleAuthState()
          console.warn(tokenData.get())
          localStorageService.saveData('token', tokenData.get())
        })
        .catch((error: Error) => {
          console.warn(error.message)
        })
    } catch (e) {
      console.error(e)
    }
  }
}
