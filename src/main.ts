import '@styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vuetify/styles'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
