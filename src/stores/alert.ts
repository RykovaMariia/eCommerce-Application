import { defineStore } from 'pinia'

type AlertVariants = 'info' | 'error' | 'success' | 'warning'

interface AlertState {
  isOpenAlert: boolean

  messageInfo?: {
    message: string
    type: AlertVariants
  }
}

export const useAlertStore = defineStore('Alert', {
  state: (): AlertState => ({
    isOpenAlert: false,
    messageInfo: undefined,
  }),

  actions: {
    hide() {
      this.isOpenAlert = false
      this.messageInfo = undefined
    },

    show(message: string, type: AlertVariants) {
      this.isOpenAlert = true
      this.messageInfo = {
        message,
        type,
      }
    },
  },
})
