import { ClientService, clientService } from '@/services/clientService'

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
    return product.then((value) => {
      return value.body.results[0].masterData
    })
  }
}

export const productService = new ProductService(clientService)
