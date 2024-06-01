import { ClientService, clientService } from '@/api/ClientService'

export class ProductsService {
  constructor(private clientService: ClientService) {}

  getCategories() {
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

  getProducts(limit: number, offset: number, sorting: string, categoryId?: string) {
    if (categoryId) {
      return this.clientService
        .getApiRoot()
        .productProjections()
        .search()
        .get({
          queryArgs: {
            'filter.query': `${categoryId ? `categories.id:"${categoryId}"` : ''}`,
            limit,
            offset,
            sort: sorting,
          },
        })
        .execute()
    }

    return this.clientService
      .getApiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit,
          offset,
          sort: sorting,
        },
      })
      .execute()
  }
}

export const productsService = new ProductsService(clientService)
