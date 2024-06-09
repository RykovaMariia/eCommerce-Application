import { ClientService, clientService } from '@/api/ClientService'

export class ProductService {
  constructor(private clientService: ClientService) {}

  getProduct(key: string) {
    const product = this.clientService
      .getApiRoot()
      .products()
      .get({
        queryArgs: {
          where: `key=${key}`,
        },
      })
      .execute()
    return product.then(({ body: { results } }) => results[0].masterData)
  }
}

export const productService = new ProductService(clientService)
