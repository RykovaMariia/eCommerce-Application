import type { CategoryLink } from '@/interfaces/link'
import type { Category } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'

const ALL_PRODUCTS = {
  parent: {
    name: 'All products',
    href: '/catalog',
    description: '',
  },
} as const

export interface Categories {
  parent: Category
  children: Category[]
}

export const useCategoriesStore = defineStore('Categories', {
  state: (): { categories: Categories[] } => ({
    categories: [],
  }),
  actions: {
    setCategories(categories: Categories[]) {
      this.categories = categories
    },
  },
  getters: {
    categoriesLinks(state: { categories: Categories[] }) {
      return state.categories.reduce(
        (calc: CategoryLink[], category) => {
          calc.push({
            parent: {
              name: category.parent.key ?? '',
              href: { name: 'category', params: { categoryId: category.parent.key } },
              description: category.parent.description?.['en-GB'] ?? '',
            },
            children: category.children.map((subCategory) => {
              return {
                name: subCategory.key ?? '',
                href: {
                  name: 'subCategory',
                  params: { categoryId: category.parent.key, subCategoryId: subCategory.key },
                },
              }
            }),
          })
          return calc
        },
        [ALL_PRODUCTS],
      )
    },
  },
})
