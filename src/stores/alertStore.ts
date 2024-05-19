import { defineStore } from 'pinia'

interface Alert {
  isOpenAlert: boolean
  message: string
  type: 'info' | 'error' | 'success' | 'warning'
}

export const alertStore = defineStore('Alert', {
  state: (): Alert => ({
    isOpenAlert: false,
    message: '',
    type: 'info',
  }),

  actions: {
    setFalse() {
      this.message = ''
      this.isOpenAlert = false
    },

    setTrue() {
      this.isOpenAlert = true
    },
  },
})
