import { productsService } from '@/services/productsService'

export async function getCategories() {
  return productsService.getCategories().then((res) => res.body.results)
}
