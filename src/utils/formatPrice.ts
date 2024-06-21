import type { TypedMoney } from '@commercetools/platform-sdk'

export function getPriceAccordingToFractionDigits(value?: TypedMoney, quantity?: number) {
  if (value) {
    if (quantity) {
      return parseFloat(((value.centAmount / 10 ** value.fractionDigits) * quantity).toFixed(2))
    }
    return parseFloat((value.centAmount / 10 ** value.fractionDigits).toFixed(2))
  }
  return 0
}
