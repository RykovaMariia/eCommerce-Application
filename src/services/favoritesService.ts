import { localStorageService } from './storageService'
import type { ShoppingList, ShoppingListLineItem } from '@commercetools/platform-sdk'
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

  public async createFavoritesListAndSaveState() {
    const { body } = await this.favoritesService.createFavoritesList()
    localStorageService.saveData('favoritesListId', body.id)
    useFavoritesStore().setFavorites(body)
    return body
  }

  public async addProductToFavoritesList(
    productId: string,
    variantId: number,
    favorites?: ShoppingList,
  ) {
    const favoritesId = localStorageService.getData('favoritesListId')
    if (!favoritesId) {
      favorites = await this.createFavoritesListAndSaveState()
    }
    if (favorites?.id) {
      return favoritesApiService
        .addProductToFavorites({
          id: favorites.id,
          version: favorites.version,
          productId,
          variantId,
        })
        .then(({ body }) => useFavoritesStore().setFavorites(body))
    }
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
}
export const favoritesService = new FavoritesService(favoritesApiService)
