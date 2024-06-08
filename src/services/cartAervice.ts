import { ClientService, clientService } from '@/api/ClientService'
import { localStorageService } from './storageService'

export class CartService {
  constructor(private clientService: ClientService) {}

  private getAnonymousId() {
    return localStorageService.getData('anonymousId')
  }

  private getCartID() {
    return localStorageService.getData('cartId')
  }

  public create() {
    return this.clientService
      .getApiRoot()
      .me()
      .carts()
      .post({ body: { currency: 'EUR' } })
      .execute()
  }

  public getCartById() {
    return this.clientService.getApiRoot().carts().withId({ ID: this.getCartID() }).get().execute()
  }

  public updateAnonymousId(version: number) {
    return this.clientService
      .getApiRoot()
      .carts()
      .withId({ ID: this.getCartID() })
      .post({
        body: {
          version,
          actions: [{ action: 'setAnonymousId', anonymousId: this.getAnonymousId() }],
        },
      })
      .execute()
  }
}

export const cartService = new CartService(clientService)
