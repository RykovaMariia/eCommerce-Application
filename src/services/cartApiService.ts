import type { CartData, LineItem } from '@/interfaces/cartData'
import { ClientService, clientService } from '@/services/clientService'

export class CartApiService {
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

  public addProductToCart({
    id,
    version,
    productId,
    variantId,
  }: CartData & { productId: string; variantId?: number }) {
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
              variantId,
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
}

export const cartApiService = new CartApiService(clientService)
