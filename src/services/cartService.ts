import type { CartData, LineItem } from '@/interfaces/cart'
import { ClientService, clientService } from '@/services/clientService'

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
  public changeProductQuantity({ id, version, lineItemId, quantity }: CartData & LineItem) {
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
              quantity: quantity ?? 0,
            },
          ],
        },
      })
      .execute()
  }

  public removeLineItem({ id, version, lineItemId }: CartData & LineItem) {
    return this.clientService
      .getApiRoot()
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
            },
          ],
        },
      })
      .execute()
  }

  public deleteCart({ id, version }: CartData) {
    return this.clientService
      .getApiRoot()
      .carts()
      .withId({ ID: id })
      .delete({ queryArgs: { version } })
      .execute()
  }
}

export const cartService = new CartService(clientService)
