import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as vuetifyComponents from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'

const vuetify = createVuetify({
  components: {
    ...vuetifyComponents,
    VDateInput,
  },
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#f4e8da',
          primary: '#838a60',
          secondary: '#bb9758',
          accent: '#82B1FF',
          error: '#ba6559',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          surface: '#bb9758',
        },
      },
    },
  },
})

export default vuetify
