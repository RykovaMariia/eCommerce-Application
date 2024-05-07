import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Page404 from '@/pages/404Page.vue'
import IconZero from '@components/icons/IconZero.vue'

describe('404Page contains component IconZero', () => {
  it('renders properly', () => {
    const wrapper = mount(Page404)
    expect(wrapper.findComponent(IconZero).exists()).toBe(true)
  })
})
