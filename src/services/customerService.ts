import { ClientService, clientService } from '@/api/ClientService'
import type { UserLoginData, UserPasswordsData } from '@/interfaces/userData'
import { userAuth } from '@/stores/userAuth'
import type { ICustomer } from '@/types/writable'
import { authService } from './authService'

export class CustomerService {
  constructor(private clientService: ClientService) {}

  user() {
    return this.clientService.getApiRoot().me().get().execute()
  }

  update(customer: ICustomer) {
    const { firstName, lastName, dateOfBirth, email } = customer

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

  updatePassword(userPasswords: UserPasswordsData) {
    const userPasswordData = this.clientService
      .getApiRoot()
      .me()
      .password()
      .post({
        body: {
          version: userAuth().customerVersion,
          currentPassword: userPasswords.currentPassword,
          newPassword: userPasswords.newPassword,
        },
      })
      .execute()
    userPasswordData.then(() => {
      userAuth().logout()
      const userData: UserLoginData = {
        email: userPasswords.email,
        password: userPasswords.newPassword,
      }
      authService.login(userData)
    })

    return userPasswordData
  }
}

export const customerService = new CustomerService(clientService)
