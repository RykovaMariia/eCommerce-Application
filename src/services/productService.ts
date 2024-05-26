import { ClientService, clientService } from '@/api/ClientService'

export class ProductService {
  constructor(
    private clientService: ClientService,
  ) {}

  async getProduct() {
    const product = this.clientService
    .getApiRoot()
    .products()
    .get({
      queryArgs: { 
        where: `key=106`
      } 
    })
    .execute()
    return product.then((value) => {
      return value.body.results[0]
    })
  }
}

export const productService = new ProductService(clientService)