import type { FavoritesData } from '@/interfaces/favoritesData'
import { ClientService, clientService } from '@/services/clientService'

class FavoritesService {
  constructor(private clientService: ClientService) {}

  public createFavoritesList() {
    return this.clientService
      .getApiRoot()
      .me()
      .shoppingLists()
      .post({ body: { name: { 'en-GB': 'Favorites' } } })
      .execute()
  }

  public getFavoritesListById(favoritesListId: string) {
    return this.clientService
      .getApiRoot()
      .shoppingLists()
      .withId({ ID: favoritesListId })
      .get()
      .execute()
  }

  public updateAnonymousId({ id, version, anonymousId }: FavoritesData) {
    return this.clientService
      .getApiRoot()
      .shoppingLists()
      .withId({ ID: id })
      .post({
        body: {
          version,
          actions: [{ action: 'setAnonymousId', anonymousId }],
        },
      })
      .execute()
  }

  public addProductToFavorites({
    id,
    version,
    productId,
    variantId,
  }: FavoritesData & { productId: string; variantId?: number }) {
    return this.clientService
      .getApiRoot()
      .shoppingLists()
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

  public removeLineItemFromFavorites({
    id,
    version,
    lineItemId,
  }: FavoritesData & { lineItemId: string }) {
    return this.clientService
      .getApiRoot()
      .shoppingLists()
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
}

export const favoritesApiService = new FavoritesService(clientService)
export type FavoritesServiceType = typeof favoritesApiService
