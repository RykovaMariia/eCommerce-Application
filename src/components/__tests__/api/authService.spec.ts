import { describe, it, expect, afterEach, vi } from 'vitest'
import { AuthService } from '@/services/authService'
import { ClientService } from '@/services/clientService'
import type { LocalStorageState, StorageService } from '@/services/storageService'

describe('Auth Service', () => {
  const ClientServiceMock = {
    getRoot: vi.fn(() => {
      return {
        me: () => {
          return {
            login: () => {
              return {
                post: () => {
                  return { execute: () => Promise.resolve({}) }
                },
              }
            },
          }
        },
      }
    }),
    setApiRoot: vi.fn(),
    getPasswordFlowClient: vi.fn(),
  }

  const localStorageServiceMock = {
    saveData: vi.fn(),
  }

  const authService = new AuthService(
    ClientServiceMock as unknown as ClientService,
    localStorageServiceMock as unknown as StorageService<LocalStorageState>,
  )

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call the clientService methods with the correct data', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'Password123',
    }

    const token = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    }

    await authService.login(userData)

    expect(ClientServiceMock.getPasswordFlowClient).toHaveBeenCalledWith(
      userData.email,
      userData.password,
    )
    expect(localStorageServiceMock.saveData).toHaveBeenCalledWith('token', token)
  })
})
