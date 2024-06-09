import { clientService, type ClientService } from '@/services/clientService'
import { userAuth } from '@/stores/userAuth'
import type { Address, MyCustomerUpdateAction } from '@commercetools/platform-sdk'

class AddressService {
  constructor(private clientService: ClientService) {}

  create(address: Address) {
    return this.clientService
      .getApiRoot()
      .me()
      .post({
        body: {
          version: userAuth().customerVersion,
          actions: [
            {
              action: 'addAddress',
              address,
            },
          ],
        },
      })
      .execute()
  }

  setTypeAddress(actions: MyCustomerUpdateAction[], version: number) {
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

  update(address: Address) {
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
              address,
            },
          ],
        },
      })
      .execute()
  }

  remove(address: Address) {
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

  setDefault(actions: MyCustomerUpdateAction[]) {
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

export const addressService = new AddressService(clientService)
