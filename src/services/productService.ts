import { ClientService, clientService } from '@/api/ClientService'

export class ProductService {
  constructor(private clientService: ClientService) {}

  async getProduct() {
    const product = this.clientService
      .getApiRoot()
      .products()
      .get({
        queryArgs: {
          where: `key=140`,
        },
      })
      .execute()
    return product.then((value) => {
      return value.body.results[0].masterData
    })
  }
}

export const productService = new ProductService(clientService)
