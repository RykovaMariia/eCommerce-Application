import { ClientService } from '@/api/ClientService'
import type { UserPasswordsData } from '@/interfaces/userData'
import { userAuth } from '@/stores/userAuth'
import type { ICustomer } from '@/types/writable'
import type { Ref } from 'vue'

export class CustomerService {
  constructor(private clientService: ClientService) {}

  async user() {
    return this.clientService.getApiRoot().me().get().execute()
  }

  async update(customer: ICustomer) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions: [
            {
              action: 'setFirstName',
              firstName: customer.firstName,
            },
            {
              action: 'setLastName',
              lastName: customer.lastName,
            },
            {
              action: 'setDateOfBirth',
              dateOfBirth: customer.dateOfBirth,
            },
            {
              action: 'changeEmail',
              email: customer.email,
            },
          ],
        },
      })
      .execute()
  }

  async updatePassword(userPasswords: Ref<UserPasswordsData>) {
    return this.clientService
      .getApiRoot()
      .me()
      .password()
      .post({
        body: {
          version: userAuth().customerVersion,
          currentPassword: userPasswords.value.currentPassword,
          newPassword: userPasswords.value.newPassword,
        },
      })
      .execute()
  }
}

export const customerService = new CustomerService(new ClientService())
