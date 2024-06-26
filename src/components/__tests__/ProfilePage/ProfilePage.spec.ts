import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import ProfileEditForm from '@/pages/ProfilePage/components/ProfileEditForm.vue'
import ProfileAddress from '@/pages/ProfilePage/components/ProfileAddress.vue'
import ProfilePage from '@pages/ProfilePage/ProfilePage.vue'
import { ResizeObserverMock, vuetify } from '@/utils/testUtils'
import { createPinia } from 'pinia'

describe('ProfilePage', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock
  })

  it('contains component ProfileEditForm', () => {
    const wrapper = mount(ProfilePage, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    })
    expect(wrapper.findComponent(ProfileEditForm).exists()).toBeTruthy
  })

  it('contains component ProfileAddress', () => {
    const wrapper = mount(ProfilePage, {
      global: {
        plugins: [createPinia(), vuetify],
      },
    })
    expect(wrapper.findComponent(ProfileAddress).exists()).toBeTruthy
  })
})
