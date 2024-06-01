import type { CategoryLink } from '@/interfaces/link'
import type { Category } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'

export const categoriesStore = defineStore('Categories', {
  state: (): { categories: Category[]; categoriesLink: CategoryLink[] } => ({
    categories: [],
    categoriesLink: [],
  }),
  actions: {
    setCategories(categories: Category[]) {
      this.categories = categories
    },
    getCategoriesLink() {
      this.categoriesLink = this.categories.reduce((calc: CategoryLink[], el) => {
        calc.push({ name: el.key, href: { name: 'category', params: { categoryId: el.key } } })
        return calc
      }, [])
    },

    getCategoriesId() {},
  },
})
