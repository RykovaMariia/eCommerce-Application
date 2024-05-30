import { ClientService, clientService } from '@/api/ClientService'

export class ProductService {
  constructor(private clientService: ClientService) {}

  async getProduct() {
    const product = this.clientService
      .getApiRoot()
      .products()
      .get({
        queryArgs: {
          where: `key=122`,
        },
      })
      .execute()
    return product.then((value) => {
      console.warn(value.body.results[0].masterData)
      return value.body.results[0].masterData
    })
  }
}

export const productService = new ProductService(clientService)
