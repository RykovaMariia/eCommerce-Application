import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import Footer from '@components/core/Footer.vue'
import { vuetify } from '@/utils/test-utils'

describe('Footer', () => {
  it('contains text', async () => {
    const wrapper = mount(Footer, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.text()).toContain('Eco-friendly place')
  })
})
