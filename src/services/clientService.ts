import fetch from 'isomorphic-fetch'
import {
  ClientBuilder,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk'
import { tokenData } from './tokenService'
import { localStorageService } from '@/services/storageService'
import { generateRandomString } from '@/utils/randomString'
import { configService } from './configService'

const userClientBuilder = new ClientBuilder()

export class ClientService {
  private projectKey = configService.getSecret('VITE_CTP_PROJECT_KEY')
  private authUri = configService.getSecret('VITE_CTP_AUTH_URL')
  private apiUri = configService.getSecret('VITE_CTP_API_URL')
  private scopes = [configService.getSecret('VITE_CTP_SCOPES')]
  private clientId = configService.getSecret('VITE_CTP_CLIENT_ID')
  private clientSecret = configService.getSecret('VITE_CTP_CLIENT_SECRET')

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: this.apiUri,
    fetch,
  }

  private apiRoot: ByProjectKeyRequestBuilder

  constructor() {
    this.apiRoot = this.getRoot()
  }

  private getRefreshToken() {
    return localStorageService.getData('token')?.refreshToken ?? ''
  }

  public setApiRoot() {
    this.apiRoot = this.getRoot(this.getClient())
  }

  public getApiRoot() {
    return this.apiRoot
  }

  private getAnonymousAuthMiddlewareOptions = (anonymousId: string) => {
    return {
      host: this.authUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        anonymousId,
      },
      scopes: this.scopes,
      fetch,
    }
  }

  private getRefreshAuthMiddlewareOptions = (refreshToken: string) => {
    return {
      host: this.authUri,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      refreshToken,
      tokenCache: tokenData,
      fetch,
    }
  }

  private getPasswordAuthMiddlewareOptions(
    email: string,
    password: string,
  ): PasswordAuthMiddlewareOptions {
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

  private getDefaultClient() {
    return userClientBuilder
      .withProjectKey(this.projectKey)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
  }

  public getPasswordFlowClient(email: string, password: string) {
    return this.getDefaultClient()
      .withPasswordFlow(this.getPasswordAuthMiddlewareOptions(email, password))
      .build()
  }

  private getClient() {
    const refreshToken = this.getRefreshToken()

    if (refreshToken) {
      return this.getDefaultClient()
        .withRefreshTokenFlow(this.getRefreshAuthMiddlewareOptions(refreshToken))
        .build()
    } else {
      const anonymousId = generateRandomString()
      localStorageService.saveData('anonymousId', anonymousId)
      return this.getDefaultClient()
        .withAnonymousSessionFlow(this.getAnonymousAuthMiddlewareOptions(anonymousId))
        .build()
    }
  }

  public getRoot(client = this.getClient()) {
    return createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: this.projectKey,
    })
  }
}

export const clientService = new ClientService()
