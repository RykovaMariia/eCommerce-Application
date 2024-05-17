import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
  components: { ...components },
  directives: { ...directives },
})

export class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

export function getAppWrapper() {
  return {
    template: `
      <v-app>
        <slot  />
      </v-app>
    `,
  }
}
