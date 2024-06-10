import type { CartData } from '@/interfaces/cartData'
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
}

export const cartApiService = new CartApiService(clientService)
