import { ClientService, clientService } from '@/api/ClientService'

export class CustomerService {
  constructor(private clientService: ClientService) {}

  async user() {
    return this.clientService.getApiRoot().me().get().execute()
  }
}

export const customerService = new CustomerService(clientService)
