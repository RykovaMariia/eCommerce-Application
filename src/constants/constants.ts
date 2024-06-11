import type { SortBy } from '@/enums/sortingCommand'

export const COUNTRY = 'GB'

export const SORTING_ITEMS: SortBy[] = ['Price ascending', 'Price descending', 'Name A-Z'] as const

export const FULL_PERCENTAGE = 100

export const YEAR_TO_SHOW = 2000

export const OUR_INFO = [
  {
    name: 'Maria',
    imageSrc:
      'https://avatars.githubusercontent.com/u/129385242?v=4',
    role: 'Team lead / Frontend developer',
    bio: 'A meticulous perfectionist with a keen eye for detail',
    contributions:
      'Configuring the repository and task board, header, catalog page, routing, cart page, products service',
    githubLink: 'https://github.com/rykovamariia',
  },
  {
    name: 'Julia',
    imageSrc: 'https://avatars.githubusercontent.com/u/25349576?v=4',
    role: 'Frontend developer',
    bio: 'A passionate and enthusiastic developer who is always eager to learn new technologies and techniques',
    contributions:
      'Footer, profile, 404 pages, API client service, a lot of work with SDK, adding product to cart',
    githubLink: 'https://github.com/yuliyavoronovich',
  },
  {
    name: 'Karina',
    imageSrc:
      'https://lh3.googleusercontent.com/a/ACg8ocLWno28AHmrcPaNB_CsGCDlBifKR1jmQQBv2uKoyAGhGTgNz04CoSNTLTF09SPI2DUz9-2JqCqlwVAOVCY_ryc67fp9n6NS=s576-c-no',
    role: 'Frontend developer',
    bio: 'Reliable and conscientious team member who consistently delivers high-quality work on time',
    contributions: 'Configuration project, main, login, registration, product and about us pages',
    githubLink: 'https://github.com/chickenmcnuggetss',
  },
] as const
