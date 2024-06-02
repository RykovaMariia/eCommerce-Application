import { ClientService, clientService } from '@/api/ClientService'
import type { QueryParam } from '@commercetools/sdk-client-v2'

interface QueryArgs {
  fuzzy?: boolean
  fuzzyLevel?: number
  markMatchingVariants?: boolean
  filter?: string | string[]
  'filter.facets'?: string | string[]
  'filter.query'?: string | string[]
  facet?: string | string[]
  sort?: string | string[]
  limit?: number
  offset?: number
  withTotal?: boolean
  staged?: boolean
  priceCurrency?: string
  priceCountry?: string
  priceCustomerGroup?: string
  priceChannel?: string
  localeProjection?: string | string[]
  storeProjection?: string
  expand?: string | string[]
  [key: string]: QueryParam
}

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

  getSubCategories(parentCategoryId: string) {
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

  getProducts(limit: number, offset: number, sorting: string, categoryId?: string) {
    let queryArgs: QueryArgs = { limit, offset, sort: sorting }
    if (categoryId) {
      queryArgs = {
        ...queryArgs,
        'filter.query': `${categoryId ? `categories.id:subtree("${categoryId}")` : ''}`,
      }
    }

    return this.clientService
      .getApiRoot()
      .productProjections()
      .search()
      .get({ queryArgs: queryArgs })
      .execute()
  }
}

export const productsService = new ProductsService(clientService)
