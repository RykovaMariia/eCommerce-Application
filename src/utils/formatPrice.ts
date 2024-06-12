import type { TypedMoney } from '@commercetools/platform-sdk'

export function getPriceAccordingToFractionDigits(value?: TypedMoney, quantity?: number) {
  if (value) {
    if (quantity) {
      return (value.centAmount / 10 ** value.fractionDigits) * quantity
    }
    return value.centAmount / 10 ** value.fractionDigits
  }
  return 0
}
