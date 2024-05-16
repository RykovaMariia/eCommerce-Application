import { defineStore } from "pinia"
import type { Address } from '@/interfaces/userData';

interface State {
  addressList: Address[]
  address: Address
}
export const useAddressStore = defineStore('address', {
  state: (): State => {
    return {
      addressList: [],
      address: {
        city: '',
        street: '',
        postalCode: '',
      },
    }
  },
})
