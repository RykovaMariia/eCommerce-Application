import type { ShoppingList, ShoppingListLineItem } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('Favorites', {
  state: (): {
    favorites: ShoppingList | undefined
  } => ({
    favorites: undefined,
  }),
  actions: {
    setFavorites(favorites: ShoppingList) {
      this.favorites = favorites
    },
  },
  getters: {
    lineItemsInFavorites(state) {
      return state.favorites?.lineItems.map(({ productId, variantId }: ShoppingListLineItem) => {
        return { productId, variantId }
      })
    },
  },
})
