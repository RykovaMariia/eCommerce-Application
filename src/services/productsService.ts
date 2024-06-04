import { ClientService, clientService } from '@/api/ClientService'
import { HUNDRED } from '@/constants/constants'
import { Facet } from '@/enums/facet'
import type { QueryParam } from '@commercetools/sdk-client-v2'
import { SortingCommand, type SortBy } from '@/enums/sortingCommand'

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

  getProducts(
    limit: number,
    offset: number,
    sorting: SortBy,
    categoryId?: string,
    colorFilter?: string[],
    quantityFilter?: string[],
    priceFilter?: [string, string],
    searchString?: string,
  ) {
    const sortingCommand = sorting ? SortingCommand[sorting] : SortingCommand.default

    let queryArgs: QueryArgs = {
      limit,
      offset,
      sort: sortingCommand,
      facet: [Facet.color, Facet.quantity, Facet.price],
    }

    const filter = []

    if (searchString) {
      queryArgs = {
        ...queryArgs,
        'text.en-GB': `"${searchString}"`,
        fuzzy: true,
      }
    }

    if (categoryId) {
      filter.push(`${categoryId ? `categories.id:subtree("${categoryId}")` : ''}`)
    }
    if (colorFilter?.length) {
      filter.push(`${Facet.color}: ${colorFilter.map((el) => `"${el}"`).join(',')}`)
    }
    if (quantityFilter?.length) {
      filter.push(`${Facet.quantity}: ${quantityFilter.map((el) => `"${el}"`).join(',')}`)
    }

    if (priceFilter?.length) {
      filter.push(
        `${Facet.price}: range(${+priceFilter[0] * HUNDRED} to ${+priceFilter[1] * HUNDRED})`,
      )
    }

    if (filter.length) {
      queryArgs = {
        ...queryArgs,
        'filter.query': filter,
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
