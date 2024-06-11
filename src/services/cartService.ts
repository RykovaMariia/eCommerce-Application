import { useCartStore } from '@/stores/cart'
import { cartApiService, type CartApiService } from './cartApiService'
import { localStorageService } from './storageService'
import type { LineItem } from '@commercetools/platform-sdk'
import type { ProductItem } from '@/interfaces/productData'
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

  public getLineIdByProduct(lineItems: LineItem[], productId: string, variantId: number) {
    return lineItems.find((item) => item.productId === productId && item.variant.id === variantId)
      ?.id
  }

  public findItemByVariantIdAndProductId(
    lineItems: LineItem[],
    productId: string,
    variantId: number,
  ) {
    return lineItems.some((item) => item.productId === productId && item.variant.id === variantId)
  }

  public getVariantByAttribute(variants: ProductItem[], selectedVariants: string[]) {
    return variants.find(
      ({ attributes }) =>
        attributes[0] === selectedVariants[0] && attributes[1] === selectedVariants[1],
    )
  }
}
export const cartService = new CartService(cartApiService)
