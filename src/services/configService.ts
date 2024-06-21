class ConfigService {
  constructor(private readonly env: ImportMetaEnv) {}

  getSecret<T extends keyof ImportMetaEnv>(secretName: T): ImportMetaEnv[T] {
    return this.env[secretName]
  }
}
export const configService = new ConfigService(import.meta.env)
