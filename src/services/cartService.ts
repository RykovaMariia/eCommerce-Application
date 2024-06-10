import { ClientService, clientService } from '@/services/clientService'

interface CartData {
  id: string
  version: number
  anonymousId: string
}

export class CartService {
  constructor(private clientService: ClientService) {}

  public create() {
    return this.clientService
      .getApiRoot()
      .me()
      .carts()
      .post({ body: { currency: 'EUR' } })
      .execute()
  }

  public getCartById(cartId: string) {
    return this.clientService.getApiRoot().carts().withId({ ID: cartId }).get().execute()
  }

  public updateAnonymousId({ id, version, anonymousId }: CartData) {
    return this.clientService
      .getApiRoot()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'setAnonymousId', anonymousId }],
        },
      })
      .execute()
  }

  public addProductToCart(id: string, version: number, productId: string, quantity?: number) {
    return this.clientService
      .getApiRoot()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              quantity,
            },
          ],
        },
      })
      .execute()
  }
  public changeProductQuantity(id: string, version: number, lineItemId: string, quantity: number) {
    return this.clientService
      .getApiRoot()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            },
          ],
        },
      })
      .execute()
  }
}

export const cartService = new CartService(clientService)
