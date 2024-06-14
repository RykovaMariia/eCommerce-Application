import { localStorageService } from './storageService'
import type { ShoppingListLineItem } from '@commercetools/platform-sdk'
// import type { ProductItem } from '@/interfaces/productData'
import { type FavoritesServiceType, favoritesApiService } from './favoritesApiService'
import { useFavoritesStore } from '@/stores/favorites'
const favoritesListId = localStorageService.getData('favoritesListId')
const anonymousId = localStorageService.getData('anonymousId')

class FavoritesService {
  constructor(private favoritesService: FavoritesServiceType) {}

  public setAnonymousSession() {
    if (!favoritesListId) {
      return
    }
    this.favoritesService
      .getFavoritesListById(favoritesListId)
      .then(({ body }) => {
        if (anonymousId && body.createdBy?.anonymousId !== anonymousId) {
          return this.favoritesService
            .updateAnonymousId({ id: favoritesListId, version: body.version, anonymousId })
            .then(({ body }) => body)
        }
        return body
      })
      .then((body) => {
        useFavoritesStore().setFavorites(body)
      })
  }

  public createFavoritesListAndSaveState() {
    return this.favoritesService.createFavoritesList().then(({ body }) => {
      localStorageService.saveData('favoritesListId', body.id)
      useFavoritesStore().setFavorites(body)
    })
  }

  public isProductInFavorites(lineItems: ShoppingListLineItem[], productId: string) {
    return lineItems.some((item) => item.productId === productId)
  }

  public getLineIdByProduct(
    lineItems: ShoppingListLineItem[],
    productId: string,
    variantId: number,
  ) {
    return lineItems.find((item) => item.productId === productId && item.variantId === variantId)
      ?.id
  }

  // public findItemByVariantIdAndProductId(
  //   lineItems: ShoppingListLineItem[],
  //   productId: string,
  //   variantId: number,
  // ) {
  //   return lineItems.some((item) => item.productId === productId && item.variantId === variantId)
  // }

  // public getVariantByAttribute(variants: ProductItem[], selectedVariants: string[]) {
  //   return variants.find(
  //     ({ attributes }) =>
  //       attributes[0] === selectedVariants[0] && attributes[1] === selectedVariants[1],
  //   )
  // }
}
export const favoritesService = new FavoritesService(favoritesApiService)
