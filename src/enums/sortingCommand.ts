export enum SortingCommand {
  default = 'createdAt asc',
  'Price ascending' = 'price asc',
  'Price descending' = 'price desc',
  'Name A-Z' = 'name.en-GB asc',
}

export type SortBy = keyof typeof SortingCommand
