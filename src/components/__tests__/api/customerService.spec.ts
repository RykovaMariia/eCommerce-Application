import { describe, it, expect, afterEach, vi } from 'vitest'
import { CustomerService } from '@/services/customerService'
import { ClientService } from '@/api/ClientService'

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
