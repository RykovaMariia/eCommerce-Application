import { ClientService, clientService } from '@/services/clientService'
import type { UserLoginData, UserPasswordsData } from '@/interfaces/userData'
import { userAuth } from '@/stores/userAuth'
import type { ICustomer } from '@/types/writable'
import { authService } from './authService'

export class CustomerService {
  constructor(private clientService: ClientService) {}

  user() {
    return this.clientService.getApiRoot().me().get().execute()
  }

  update({ firstName, lastName, dateOfBirth, email }: ICustomer) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions: [
            {
              action: 'setFirstName',
              firstName,
            },
            {
              action: 'setLastName',
              lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth,
            },
            {
              action: 'changeEmail',
              email,
            },
          ],
        },
      })
      .execute()
  }

  updatePassword({ currentPassword, newPassword, email }: UserPasswordsData) {
    const userPasswordData = this.clientService
      .getApiRoot()
      .me()
      .password()
      .post({
        body: {
          version: userAuth().customerVersion,
          currentPassword,
          newPassword,
        },
      })
      .execute()
    userPasswordData.then(() => {
      userAuth().logout()
      const userData: UserLoginData = {
        email,
        password: newPassword,
      }
      authService.login(userData)
    })

    return userPasswordData
  }
}

export const customerService = new CustomerService(clientService)
