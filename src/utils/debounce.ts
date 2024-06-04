export function debounce<T extends Function>(cb: T, wait = 3000) {
  let timer: NodeJS.Timeout
  const callable = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => cb(...args), wait)
  }
  return <T>(<any>callable)
}
