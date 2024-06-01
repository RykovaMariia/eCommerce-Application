export enum SortingCommand {
  default = 'createdAt asc',
  'Price: Low to High' = 'price asc',
  'Price: High to Low' = 'price desc',
  'alphabetically' = 'name.en-GB asc',
}

export type SortBy = keyof typeof SortingCommand
