export function getMaxTime() {
  const currentTime = new Date(Date.now())
  const limitAge = 13
  const years = currentTime.getFullYear() - limitAge
  currentTime.setFullYear(years)
  return currentTime.toISOString()
}

export function formateDate(current: string) {
  const date = new Date(current)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
