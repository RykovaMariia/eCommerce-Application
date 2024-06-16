export function makeFilterString(facet: string, filter: string | string[]) {
  return `${facet}: ${filter instanceof Array ? filter.map((el) => `"${el}"`).join(',') : `"${filter}"`}`
}
