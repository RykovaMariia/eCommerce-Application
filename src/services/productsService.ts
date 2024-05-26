import { ClientService, clientService } from '@/api/ClientService'

export class ProductsService {
  constructor(private clientService: ClientService) {}

  async products(limit: number, offset: number) {
    return this.clientService
      .getApiRoot()
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit,
          offset,
          sort: 'createdAt asc',
        },
      })
      .execute()
  }
}

export const productsService = new ProductsService(clientService)
