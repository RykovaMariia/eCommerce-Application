import { ClientService, clientService } from '@/services/clientService'

class CategoriesService {
  constructor(private clientService: ClientService) {}

  private getParentCategories() {
    return this.clientService
      .getApiRoot()
      .categories()
      .get({
        queryArgs: {
          where: 'parent is not defined',
          expand: [],
        },
      })
      .execute()
  }

  private getSubCategories(parentCategoryId: string) {
    return this.clientService
      .getApiRoot()
      .categories()
      .get({
        queryArgs: {
          where: `parent(id="${parentCategoryId}")`,
        },
      })
      .execute()
  }

  getCategories() {
    return this.getParentCategories().then(({ body: { results } }) => {
      const categoriesPromises = results.map((parentCategory) => {
        return this.getSubCategories(parentCategory.id).then(({ body: { results } }) => {
          return {
            parent: parentCategory,
            children: results,
          }
        })
      })
      return Promise.all(categoriesPromises)
    })
  }
}

export const categoryService = new CategoriesService(clientService)
export type CategoriesServiceType = typeof CategoriesService
