import { localStorageService } from './storageService'
import type { ShoppingList, ShoppingListLineItem } from '@commercetools/platform-sdk'
import { type FavoritesServiceType, favoritesApiService } from './favoritesApiService'
import { useFavoritesStore } from '@/stores/favorites'

class FavoritesService {
  constructor(private favoritesService: FavoritesServiceType) {}

  public setAnonymousSession() {
    const favoritesListId = localStorageService.getData('favoritesListId')
    const anonymousId = localStorageService.getData('anonymousId')
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

  private async createFavoritesListAndSaveState() {
    const { body } = await this.favoritesService.createFavoritesList()
    localStorageService.saveData('favoritesListId', body.id)
    useFavoritesStore().setFavorites(body)
    return body
  }

  public async addProductToFavoritesList({
    productId,
    variantId,
    favorites,
  }: {
    productId: string
    variantId: number
    favorites?: ShoppingList
  }) {
    const favoritesId = localStorageService.getData('favoritesListId')
    if (!favoritesId) {
      favorites = await this.createFavoritesListAndSaveState()
    }
    if (!favorites?.id) {
      return
    }
    return favoritesApiService
      .addProductToFavorites({
        id: favorites.id,
        version: favorites.version,
        productId,
        variantId,
      })
      .then(({ body }) => useFavoritesStore().setFavorites(body))
  }

  public isProductInFavorites({
    lineItems,
    productId,
    variantId,
  }: {
    lineItems: ShoppingListLineItem[]
    productId: string
    variantId: number
  }) {
    return lineItems.some(
      (lineItem) => lineItem.productId === productId && lineItem.variantId === variantId,
    )
  }

  public getLineIdByProduct({
    lineItems,
    productId,
    variantId,
  }: {
    lineItems: ShoppingListLineItem[]
    productId: string
    variantId: number
  }) {
    return lineItems.find((item) => item.productId === productId && item.variantId === variantId)
      ?.id
  }
}
export const favoritesService = new FavoritesService(favoritesApiService)
