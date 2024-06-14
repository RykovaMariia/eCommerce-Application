import type { ShoppingList } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('Favorites', {
  state: (): { favorites: ShoppingList | undefined } => ({
    favorites: undefined,
  }),
  actions: {
    setFavorites(favorites: ShoppingList) {
      this.favorites = favorites
    },
  },
  getters: {
    productInFavorites(state: { favorites: ShoppingList | undefined }) {
      return state.favorites?.lineItems.map((lineItem) => {
        return { [lineItem.id]: lineItem.variantId }
      })
    },
  },
})
