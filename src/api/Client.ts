import fetch from 'isomorphic-fetch'
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

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

  private httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: this.baseUri,
    fetch,
  }

  getClient() {
    return userClientBuilder
      .withProjectKey(this.projectKey)
      .withClientCredentialsFlow(this.authMiddlewareOptions)
      .withHttpMiddleware(this.httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build()
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
