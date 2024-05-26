import { ClientService, clientService } from '@/api/ClientService'
import type { Writeable } from '@/interfaces/writeable'
import { userAuth } from '@/stores/userAuth'
import type { Customer } from '@commercetools/platform-sdk'

export class CustomerService {
  constructor(private clientService: ClientService) {}

  async user() {
    return this.clientService.getApiRoot().me().get().execute()
  }

  async update(customer: Writeable<Customer>) {
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
}

export const customerService = new CustomerService(clientService)
