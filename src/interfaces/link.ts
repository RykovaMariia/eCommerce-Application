export interface Link {
  name: string
  href: string
}

export interface LinkByName {
  name: string
  href: string | HrefByName
}

export interface HrefByName {
  name: string
  params?: {
    categoryId?: string
    subCategoryId?: string
  }
}

export interface CategoryLink {
  parent: Link | LinkByName
  children?: Link[] | LinkByName[]
}
