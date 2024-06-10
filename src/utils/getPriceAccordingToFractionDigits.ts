import type { TypedMoney } from '@commercetools/platform-sdk'

export function getPriceAccordingToFractionDigits(value?: TypedMoney) {
  if (value) {
    return value.centAmount / 10 ** value.fractionDigits
  }
  return 0
}