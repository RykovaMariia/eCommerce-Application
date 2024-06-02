import fetch from 'isomorphic-fetch'
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { tokenData } from './TokenInfo'
import { localStorageService } from '@/services/storageService'

const userClientBuilder = new ClientBuilder()

export class ClientService {
  private refreshToken = localStorageService.getData('token')?.refreshToken ?? ''

  private projectKey = import.meta.env.VITE_CTP_PROJECT_KEY
  private authUri = import.meta.env.VITE_CTP_AUTH_URL
  private baseUri = import.meta.env.VITE_CTP_API_URL
  private scopes = [import.meta.env.VITE_CTP_SCOPES]
  private clientId = import.meta.env.VITE_CTP_CLIENT_ID
  private clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET

  private credentials = {
    clientId: this.clientId,
    clientSecret: this.clientSecret,
  }

  private authMiddlewareOptions: AuthMiddlewareOptions = {
    host: this.authUri,
    projectKey: this.projectKey,
    credentials: this.credentials,
    scopes: this.scopes,
    fetch,
  }

  private refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: this.authUri,
    projectKey: this.projectKey,
    credentials: {
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    },
    refreshToken: this.refreshToken,
    tokenCache: tokenData,
    fetch,
  }

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: this.baseUri,
    fetch,
  }

  getPasswordAuthMiddlewareOptions(email: string, password: string): PasswordAuthMiddlewareOptions {
    return {
      host: this.authUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        user: {
          username: email,
          password: password,
        },
      },
      scopes: this.scopes,
      tokenCache: tokenData,
      fetch,
    }
  }

  getDefaultClient() {
    return userClientBuilder
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
  }

  getPasswordFlowClient(email: string, password: string) {
    return this.getDefaultClient()
      .withPasswordFlow(this.getPasswordAuthMiddlewareOptions(email, password))
      .build()
  }

  getClient() {
    if (this.refreshToken) {
      return this.getDefaultClient().withRefreshTokenFlow(this.refreshAuthMiddlewareOptions).build()
    }
    return this.getDefaultClient().build()
  }

  getApiRoot(client = this.getClient()) {
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey,
    })
  }
}

export const clientService = new ClientService()
