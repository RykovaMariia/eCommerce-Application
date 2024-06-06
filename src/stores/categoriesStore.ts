import type { CategoryLink } from '@/interfaces/link'
import type { Category } from '@commercetools/platform-sdk'
import { defineStore } from 'pinia'

export interface Categories {
  parent: Category
  children: Category[]
}

export const categoriesStore = defineStore('Categories', {
  state: (): { categories: Categories[]; categoriesLinks: CategoryLink[] } => ({
    categories: [],
    categoriesLinks: [],
  }),
  actions: {
    setCategories(categories: Categories[]) {
      this.categories = categories
    },
    setCategoriesLink() {
      this.categoriesLinks = this.categories.reduce((calc: CategoryLink[], category) => {
        calc.push({
          parent: {
            name: category.parent.key ?? '',
            href: { name: 'category', params: { categoryId: category.parent.key } },
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
      }, [])
    },
  },
})
