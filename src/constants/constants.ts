import type { SortBy } from '@/enums/sortingCommand'

export const COUNTRY = 'GB'

export const SORTING_ITEMS: SortBy[] = ['Price ascending', 'Price descending', 'Name A-Z'] as const

export const CATEGORY_ID = {
  'both-body': '2ae408b2-75ad-43cf-b8c9-b0496bcbd037',
} as const

export const ALL_PRODUCTS = {
  parent: {
    name: 'All products',
    href: '/catalog',
  },
} as const

export const FULL_PERCENTAGE = 100

export const yearToShow = 2000
