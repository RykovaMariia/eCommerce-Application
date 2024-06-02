import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { ResizeObserverMock, getAppWrapper, vuetify } from '@/utils/testUtils'
import { createPinia } from 'pinia'
import router from '@/router'
import { VAppBarNavIcon } from 'vuetify/components'
import Header from '@/components/core/Header.vue'

describe('should render components within Header with a large screen width', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock
  })

  const $vuetify = {
    display: {
      mdAndDown: false,
      lgAndUp: true,
    },
  }

  it('should render text and not render VAppBarNavIcon within Header', async () => {
    const header = mount(getAppWrapper(), {
      slots: {
        default: Header,
      },
      global: {
        plugins: [createPinia(), vuetify, router],
        mocks: { $vuetify },
      },
    })

    await router.isReady()
    expect(header.findComponent(VAppBarNavIcon).exists()).toBeFalsy()
    expect(header.find('.nav-list').exists()).toBeTruthy()
    expect(header.find('.mdi-magnify').exists()).toBeTruthy()
    expect(header.find('.mdi-heart-outline').exists()).toBeTruthy()
    expect(header.find('.mdi-basket-outline').exists()).toBeTruthy()
  })
})
