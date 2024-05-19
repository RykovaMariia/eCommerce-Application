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

    show(message: string, type: 'info' | 'error' | 'success' | 'warning') {
      this.isOpenAlert = true
      this.message = message
      this.type = type
    }
  },
})
