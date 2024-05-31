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
    // .then((response) => {
    //   const addressResult = response.body
    //     ? response?.body?.addresses?.find(
    //         (item) =>
    //           item.streetName === address.streetName &&
    //           item.postalCode === address.postalCode &&
    //           item.streetNumber === address.streetNumber,
    //       )
    //     : ''
    //   const setTypeAction = type === 'billing' ? 'addBillingAddressId' : 'addShippingAddressId'

    //   if (addressResult)
    //     return this.clientService
    //       .getApiRoot()
    //       .me()
    //       .post({
    //         body: {
    //           version: response.body.version,
    //           actions: [
    //             {
    //               action: setTypeAction,
    //               addressId: addressResult?.id,
    //             },
    //             {
    //               action: 'setDefaultBillingAddress',
    //               addressId: addressResult?.id,
    //             },
    //           ],
    //         },
    //       })
    //       .execute()
    // })
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
}

export const addressService = new AddressService(new ClientService())
