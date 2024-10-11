import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('Loading', {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },
  },
})
