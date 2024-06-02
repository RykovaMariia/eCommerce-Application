import { productsService } from '@/services/productsService'
import type { Category } from '@commercetools/platform-sdk'

export async function getCategories() {
  const parentCategories = await productsService.getCategories()

  const categoriesPromises = parentCategories.body.results.map(async (parentCategory: Category) => {
    const subCategories = await productsService.getSubCategories(parentCategory.id)
    return {
      parent: parentCategory,
      children: subCategories.body.results,
    }
  })

  const categories = await Promise.all(categoriesPromises)

  return categories
}
