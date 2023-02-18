// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Sprachy',
      meta: [
        {
          name: 'theme-color',
          content: '#f7cf71'
        }
      ]
    }
  },
  alias: {
    '~': __dirname
  },
  nitro: {
    preset: "cloudflare"
  },
  runtimeConfig: {
    faunaAdminKey: '',
    faunaDomain: '',
    faunaPort: '',
    faunaScheme: '',

    frontendBaseUrl: 'http://localhost:5999',

    discordSignupWebhook: '',
    discordDeployWebhook: '',

    googleCloudCredentials: '',

    public: {
      frontendBaseUrl: 'http://localhost:5999',
    }
  },
  routeRules: {
    '/admin/**': { ssr: false }
  }
})
