import { clientService } from '@/api/ClientService'
import { userAuth } from '@/stores/auth-store'
import { localStorageService } from '@/services/storageService'
import { tokenData } from '@/api/TokenInfo'
import type { UserLoginData, UserRegistrationData } from '@/interfaces/userData'

export class AuthService {
  customers() {
    try {
      const userClientData = clientService.getApiRoot().me().get().execute()
      userClientData
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

  signup(userData: UserRegistrationData) {
    console.warn(userData.email)
    console.warn(userData.password)
    try {
      const userClientData = clientService
        .getApiRoot()
        .me()
        .signup()
        .post({
          body: userData,
        })
        .execute()
      userClientData
        .then((data) => {
          console.warn(data.body)
          this.login(userData)
        })
        .catch((error: Error) => {
          console.warn(error.message)
        })
    } catch (e) {
      console.error(e)
    }
  }

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
          //console.warn(data.body)
          userAuth().toogleAuthState()
          //console.warn(tokenData.get())
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
