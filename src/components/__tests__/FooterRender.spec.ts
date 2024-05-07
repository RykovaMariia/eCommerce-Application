import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TheFooter from '@components/core/TheFooter.vue'

import { createVuetify } from 'vuetify'

const vuetify = createVuetify()

describe.only('TheFooter contains text', () => {
  it('renders properly', async () => {
    const wrapper = mount(TheFooter, {
      global: {
        components: {
          TheFooter,
        },
        plugins: [vuetify],
      },
    })
    expect(wrapper.text()).toContain('Eco-friendly place')
  })
})
