import { ClientService } from '@/api/ClientService'
import { userAuth } from '@/stores/userAuth'
import type { Address, MyCustomerUpdateAction } from '@commercetools/platform-sdk'

export class AddressService {
  constructor(private clientService: ClientService) {}

  async create(address: Address) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions: [
            {
              action: 'addAddress',
              address: address,
            },
          ],
        },
      })
      .execute()
  }

  async setTypeAddress(actions: MyCustomerUpdateAction[], version: number) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute()
  }

  async update(address: Address) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions: [
            {
              action: 'changeAddress',
              addressId: address.id,
              address: address,
            },
          ],
        },
      })
      .execute()
  }

  async remove(address: Address) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions: [
            {
              action: 'removeAddress',
              addressId: address.id,
            },
          ],
        },
      })
      .execute()
  }

  async setDefault(actions: MyCustomerUpdateAction[]) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions,
        },
      })
      .execute()
  }
}

export const addressService = new AddressService(new ClientService())
