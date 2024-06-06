export function debounce<T extends (...args: unknown[]) => void>(cb: T, wait = 300) {
  let timer: number
  const callable = (...args: unknown[]) => {
    window.clearTimeout(timer)
    timer = window.setTimeout(() => cb(...args), wait)
  }
  return callable
}
