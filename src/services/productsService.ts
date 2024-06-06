import { ClientService, clientService } from '@/api/ClientService'
import { FULL_PERCENTAGE } from '@/constants/constants'
import { Facet } from '@/enums/facet'
import type { QueryParam } from '@commercetools/sdk-client-v2'
import { SortingCommand, type SortBy } from '@/enums/sortingCommand'

interface QueryArgs {
  fuzzy?: boolean
  filter?: string | string[]
  'filter.query'?: string | string[]
  facet?: string | string[]
  sort?: string | string[]
  limit?: number
  offset?: number
  [key: string]: QueryParam
}

interface RequestParam {
  limit: number
  offset: number
  sorting: SortBy
  categoryId?: string
  colorFilter?: string[] | string
  quantityFilter?: string[] | string
  priceFilter?: [string, string]
  search?: string
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

  getProducts({
    limit,
    offset,
    sorting,
    categoryId,
    colorFilter,
    quantityFilter,
    priceFilter,
    search,
  }: RequestParam) {
    const sortingCommand = sorting ? SortingCommand[sorting] : SortingCommand.default
    const filter = []

    let queryArgs: QueryArgs = {
      limit,
      offset,
      sort: sortingCommand,
      facet: [Facet.color, Facet.quantity],
    }

    if (search) {
      queryArgs = {
        ...queryArgs,
        'text.en-GB': `"${search}"`,
        fuzzy: true,
      }
    }

    if (categoryId) {
      filter.push(`${categoryId ? `categories.id:subtree("${categoryId}")` : ''}`)
    }
    if (colorFilter?.length) {
      if (typeof colorFilter === 'string') filter.push(`${Facet.color}: "${colorFilter}"`)
      else {
        filter.push(`${Facet.color}: ${colorFilter.map((el) => `"${el}"`).join(',')}`)
      }
    }
    if (quantityFilter?.length) {
      if (typeof quantityFilter === 'string') filter.push(`${Facet.quantity}: "${quantityFilter}"`)
      else {
        filter.push(`${Facet.quantity}: ${quantityFilter.map((el) => `"${el}"`).join(',')}`)
      }
    }

    if (priceFilter?.length) {
      filter.push(
        `${Facet.price}: range(${+priceFilter[0] * FULL_PERCENTAGE} to ${+priceFilter[1] * FULL_PERCENTAGE})`,
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
