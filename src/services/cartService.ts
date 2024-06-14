import { useCartStore } from '@/stores/cart'
import { cartApiService, type CartApiServiceType } from './cartApiService'
import { localStorageService } from './storageService'
import type { Cart, LineItem } from '@commercetools/platform-sdk'
import type { ProductItem } from '@/interfaces/productData'
const cartId = localStorageService.getData('cartId')
const anonymousId = localStorageService.getData('anonymousId')

class CartService {
  constructor(private cartApiService: CartApiServiceType) {}

  public setAnonymousSession() {
    if (!cartId) {
      return
    }
    this.cartApiService
      .getCartById(cartId)
      .then(({ body }) => {
        if (anonymousId && body.createdBy?.anonymousId !== anonymousId) {
          return this.cartApiService
            .updateAnonymousId({ id: cartId, version: body.version, anonymousId })
            .then(({ body }) => body)
        }
        return body
      })
      .then((body) => {
        useCartStore().setCart(body)
      })
  }

  public async createCartAndSaveState() {
    const { body } = await this.cartApiService.createCart()
    localStorageService.saveData('cartId', body.id)
    useCartStore().setCart(body)
    return body
  }

  public async addProductToCart(productId: string, cart?: Cart) {
    const cartId = localStorageService.getData('cartId')
    if (!cartId) {
      cart = await this.createCartAndSaveState()
    }
    if (cart?.id) {
      return cartApiService
        .addProductToCart({ id: cart.id, version: cart.version, productId })
        .then(({ body }) => useCartStore().setCart(body))
    }
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
