import fetch from 'isomorphic-fetch'
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  type RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import { userAuth } from '@/stores/auth-store'
import { tokenData } from './TokenInfo'

const userClientBuilder = new ClientBuilder()

export class Client {
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

  private passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: this.authUri,
    projectKey: this.projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
      user: {
        username: userAuth().userCredentials.email,
        password: userAuth().userCredentials.password,
      },
    },
    scopes: this.scopes,
    tokenCache: tokenData,
    fetch,
  }

  private refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: this.authUri,
    projectKey: this.projectKey,
    credentials: {
      clientId: import.meta.env.VITE_CTP_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
    },
    refreshToken: userAuth().refreshToken,
    tokenCache: tokenData,
    fetch,
  }

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: this.baseUri,
    fetch,
  }

  constructor(private isLogining = false) {}

  getDefaultClient() {
    return userClientBuilder
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
  }

  getClient() {
    if (userAuth().isLogined) {
      return this.getDefaultClient().withRefreshTokenFlow(this.refreshAuthMiddlewareOptions).build()
    }
    if (this.isLogining) {
      return this.getDefaultClient().withPasswordFlow(this.passwordAuthMiddlewareOptions).build()
    }
    return this.getDefaultClient().build()
  }

  getProjectKey() {
    return this.projectKey
  }

  getApiRoot = () => {
    return createApiBuilderFromCtpClient(this.getClient()).withProjectKey({
      projectKey: this.getProjectKey(),
    })
  }
}
