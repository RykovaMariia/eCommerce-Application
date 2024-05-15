export function getMaxTime() {
  const currentTime = new Date(Date.now())
  const limitAge = 13
  const years = currentTime.getFullYear() - limitAge
  currentTime.setFullYear(years)
  return currentTime.toISOString()
}
