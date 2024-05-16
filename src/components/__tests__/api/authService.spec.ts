import { describe, it, expect, afterEach, vi } from 'vitest'
import { AuthService } from '@/services/authService'
import { ClientService } from '@/api/ClientService'
import type { LocalStorageState, StorageService } from '@/services/storageService'
import { type UserAuth } from '@/stores/authStore'

describe('Auth Service', () => {
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
    getPasswordFlowClient: vi.fn(),
  }

  const localStorageServiceMock = {
    saveData: vi.fn(),
  }

  const userAuthMock = () => {
    return { toogleAuthState: vi.fn() }
  }

  const authService = new AuthService(
    ClientServiceMock as unknown as ClientService,
    localStorageServiceMock as unknown as StorageService<LocalStorageState>,
    userAuthMock as unknown as UserAuth,
  )

  afterEach(() => {
    vi.clearAllMocks()
  })

  it.only('should call the clientService methods with the correct data', async () => {
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
