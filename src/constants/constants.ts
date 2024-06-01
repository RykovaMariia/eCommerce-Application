import type { SortBy } from '@/enums/sortingCommand'

export const COUNTRY = 'GB'

export const CATALOG_MENU = [
  { name: 'All', href: '/catalog' },
  { name: 'Kitchen', href: 'catalog/kitchen' },
  { name: 'Bath&body', href: 'catalog/bath-body' },
]
export const SORTING_ITEMS: SortBy[] = [
  'Price: Low to High',
  'Price: High to Low',
  'alphabetically',
]

export const CATEGORY_ID = {
  'both-body': '2ae408b2-75ad-43cf-b8c9-b0496bcbd037',
}
