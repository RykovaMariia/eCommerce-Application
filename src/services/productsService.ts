import { ClientService, clientService } from '@/services/clientService'
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
  search?: string
}

export class ProductsService {
  constructor(private clientService: ClientService) {}

  getProduct(key: string) {
    return this.clientService
      .getApiRoot()
      .products()
      .get({
        queryArgs: {
          where: `key=${key}`,
        },
      })
      .execute()
      .then(({ body: { results } }) => results[0].masterData)
  }

  getProducts({
    limit,
    offset,
    sorting,
    categoryId,
    colorFilter,
    quantityFilter,
    search,
  }: RequestParam) {
    const sortingCommand = sorting ? SortingCommand[sorting] : SortingCommand.default
    const filter = []

    const queryArgs: QueryArgs = {
      limit,
      offset,
      sort: sortingCommand,
      facet: [Facet.color, Facet.quantity],
    }

    if (search) {
      queryArgs['text.en-GB'] = `"${search}"`
      queryArgs.fuzzy = true
    }

    if (categoryId) {
      filter.push(`${categoryId ? `categories.id:subtree("${categoryId}")` : ''}`)
    }
    if (colorFilter?.length) {
      filter.push(
        `${Facet.color}: ${colorFilter instanceof Array ? colorFilter.map((el) => `"${el}"`).join(',') : `"${colorFilter}"`}`,
      )
    }
    if (quantityFilter?.length) {
      filter.push(
        `${Facet.quantity}: ${quantityFilter instanceof Array ? quantityFilter.map((el) => `"${el}"`).join(',') : `"${quantityFilter}"`}`,
      )
    }

    if (filter.length) {
      queryArgs['filter.query'] = filter
    }

    return this.clientService
      .getApiRoot()
      .productProjections()
      .search()
      .get({ queryArgs })
      .execute()
  }
}

export const productsService = new ProductsService(clientService)
