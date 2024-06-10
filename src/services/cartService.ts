import { useCartStore } from '@/stores/cart'
import { cartApiService, type CartApiService } from './cartApiService'
import { localStorageService } from './storageService'
import type { LineItem } from '@commercetools/platform-sdk'
const cartId = localStorageService.getData('cartId')
const anonymousId = localStorageService.getData('anonymousId')

export class CartService {
  constructor(private cartApiService: CartApiService) {}

  public setAnonymousSession() {
    if (cartId) {
      cartApiService
        .getCartById(cartId)
        .then(({ body }) => {
          if (anonymousId && body.createdBy?.anonymousId !== anonymousId) {
            return cartApiService
              .updateAnonymousId({ id: cartId, version: body.version, anonymousId })
              .then(({ body }) => body)
          }
          return body
        })
        .then((body) => {
          useCartStore().setCart(body)
        })
    }
  }

  public createCart() {
    return cartApiService.create().then(({ body }) => {
      localStorageService.saveData('cartId', body.id)
      useCartStore().setCart(body)
    })
  }

  public isProductInCart(lineItems: LineItem[], productId: string) {
    return lineItems.some((item) => item.productId === productId)
  }
}
export const cartService = new CartService(cartApiService)
