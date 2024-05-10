import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TheFooter from '@components/core/TheFooter.vue'
import { vuetify } from '@/utils/test-utils'

describe('TheFooter', () => {
  it('contains text', async () => {
    const wrapper = mount(TheFooter, {
      global: {
        plugins: [vuetify],
      },
    })
    expect(wrapper.text()).toContain('Eco-friendly place')
  })
})
