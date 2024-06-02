import { beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ResizeObserverMock, getAppWrapper, vuetify } from '@/utils/testUtils'
import { createPinia } from 'pinia'
import router from '@/router'
import Header from '@/components/core/Header.vue'
import { VAppBarNavIcon } from 'vuetify/components'
import HoverMenu from '@/components/hover-menu/HoverMenu.vue'
import { createTestingPinia } from '@pinia/testing'

describe('should render components within Header with a small screen width ', () => {
  vi.mock('@/utils/getCategories', () => ({ getCategories: vi.fn(() => Promise.resolve({})) }))

  beforeAll(() => {
    global.ResizeObserver = ResizeObserverMock
  })

  const $vuetify = {
    display: {
      mdAndDown: true,
      lgAndUp: false,
    },
  }

  it('should render VAppBarNavIcon and not render text within Header', async () => {
    const header = mount(getAppWrapper(), {
      slots: {
        default: Header,
      },
      global: {
        plugins: [
          createPinia(),
          vuetify,
          router,
          createTestingPinia({
            initialState: {
              categories: [],
              categoriesLink: [],
              setCategories: vi.fn(() => {}),
              getCategoriesLink: vi.fn(),
            },
          }),
        ],
        mocks: { $vuetify },
      },
    })

    await router.isReady()

    expect(header.findComponent(HoverMenu).exists()).toBeFalsy()
    expect(header.findComponent(VAppBarNavIcon).exists()).toBeTruthy()
    expect(header.find('.nav-list').exists()).toBeTruthy()
    expect(header.find('.mdi-magnify').exists()).toBeTruthy()
    expect(header.find('.mdi-heart-outline').exists()).toBeTruthy()
    expect(header.find('.mdi-basket-outline').exists()).toBeTruthy()
  })
})
