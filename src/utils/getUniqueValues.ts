export function getUniqueValues<T>(array: Array<T>) {
  return [...new Set(array)].sort()
}