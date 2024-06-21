import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Footer from '@components/core/Footer.vue'
import { vuetify } from '@/utils/testUtils'
import { createPinia } from 'pinia'

describe('Footer', () => {
  it('contains text', async () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    })
    expect(wrapper.text()).toContain('Eco-friendly place')
  })
})
