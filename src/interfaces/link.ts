export interface Link {
  name: string
  href: string
}

export interface LinkByName {
  name: string
  params?: {
    categoryId?: string
  }
}

export interface CategoryLink {
  name: string | undefined
  href: LinkByName
}
