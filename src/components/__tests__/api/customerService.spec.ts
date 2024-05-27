import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { CustomerService } from '@/services/customerService'
import { ClientService } from '@/api/ClientService'
import { createPinia, setActivePinia } from 'pinia'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Cusomer Service', () => {
  const ClientServiceMock = {
    getApiRoot: vi.fn(() => {
      return {
        me: () => {
          return {
            get: () => {
              return { execute: () => Promise.resolve({}) }
            },
          }
        },
      }
    }),
    getClient: vi.fn(),
  }

  const customerService = new CustomerService(ClientServiceMock as unknown as ClientService)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return a user', async () => {
    const result = await customerService.user()
    expect(result).toEqual({})
    expect(ClientServiceMock.getApiRoot).toHaveBeenCalledOnce
    expect(ClientServiceMock.getClient).toHaveBeenCalledOnce
  })
})

describe('Cusomer Service', () => {
  const ClientServiceMock = {
    getApiRoot: vi.fn(() => {
      return {
        me: () => {
          return {
            post: () => {
              return { execute: () => Promise.resolve({}) }
            },
          }
        },
      }
    }),
    getClient: vi.fn(),
  }

  const customerService = new CustomerService(ClientServiceMock as unknown as ClientService)

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call the clientService methods with the correct data', async () => {
    const userData = {
      id: '',
      createdAt: '',
      lastModifiedAt: '',
      lastModifiedBy: {
        clientId: '',
        anonymousId: '',
      },
      createdBy: {
        clientId: '',
        anonymousId: '',
      },
      email: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      password: '',
      addresses: [],
      shippingAddressIds: [],
      billingAddressIds: [],
      isEmailVerified: false,
      stores: [],
      authenticationMode: '',
      version: 1,
      actions: [
        {
          action: 'setFirstName',
          firstName: 'Vasya',
        },
        {
          action: 'setLastName',
          lastName: 'Ivanov',
        },
        {
          action: 'setDateOfBirth',
          dateOfBirth: '1995-02-16',
        },
        {
          action: 'changeEmail',
          email: 'test@example.com',
        },
      ],
    }

    await customerService.update(userData)
    expect(ClientServiceMock.getApiRoot).toHaveBeenCalledOnce
    expect(ClientServiceMock.getClient).toHaveBeenCalledOnce
  })
})
