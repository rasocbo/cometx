// import { sortRoutes } from '@nuxt/utils'

export default {
  mode: 'universal',
  srcDir: 'src/',

  head: {
    titleTemplate: '%s',
    title: "CometX – See what's in orbit.",
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#202124' },
      {
        hid: 'description',
        name: 'description',
        content: 'Explore Planets, posts, and comments on CometX'
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Explore Planets, posts, and comments on CometX'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'CometX'
      },
      {
        name: 'og:image',
        hid: 'og:image',
        content: 'https://www.cometx.io/og_image.png'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.cometx.io'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'cometx.io'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@CometWebsite'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'CometX'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Explore Planets, posts, and comments on CometX'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://www.cometx.io/og_image.png'
      },
      {
        hid: 'twitter:url',
        name: 'twitter:url',
        content: 'https://www.cometx.io'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      }
    ]
  },

  loading: { color: '#fff' },

  buildModules: [
    '~/modules/theme',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/device',
    '@nuxt/content'
    // ['nuxt-matomo', { matomoUrl: 'https://analytics.cometx.io/', siteId: 1 }]
  ],

  eslint: {
    cache: true
  },

  build: {
    parallel: true,
    cache: true,
    hardSource: true
  },

  tailwindcss: {
    // add '~tailwind.config` alias - increases bundle size
    exposeConfig: true,
    configPath: '@/tailwind.config.js'
  },

  css: ['@/assets/css/inter/inter.css', '@/assets/css/toast/themes/sugar/index.scss'],

  plugins: ['@/plugins/toast.client.js', '@/plugins/theme.client.js', '@/plugins/theme.server.js'],

  optimizedImages: {
    optimizeImages: true
  },

  pwa: {
    manifest: {
      name: 'CometX',
      short_name: 'CometX',
      description: "See what's in orbit.",
      theme_color: '#202124',
      background_color: '#202124',
      fileName: 'manifest.[ext]?[hash]',
      start_url: '/'
    },
    meta: {
      name: 'CometX',
      description: "See what's in orbit.",
      theme_color: '#202124',
      favicon: false,
      viewport:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover',
      mobileAppIOS: true,
      appleStatusBarStyle: 'black-translucent'
    }
  },

  apollo: {
    cookieAttributes: {
      expires: 7,
      secure: process.env.NODE_ENV === 'production'
    },
    clientConfigs: {
      default: {
        httpEndpoint: 'http://api:4000/graphql',
        browserHttpEndpoint:
          process.env.NODE_ENV === 'production'
            ? 'https://api.cometx.io/graphql'
            : 'http://localhost:4000/graphql',
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        wsEndpoint: null
      }
    }
  }

  /* router: {
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'universe-sort-time',
          path: '/universe/:sort?/:time?',
          component: resolve(__dirname, 'src/components/pages/universe.vue')
        },
        {
          name: 'p-planetname-sort-time',
          path: '/p/:planetname/:sort?/:time?',
          component: resolve(__dirname, 'src/components/pages/planet.vue')
        },
        {
          name: 'p-planetname-comments-id-title',
          path: '/p/:planetname/comments/:id/:title?',
          component: resolve(__dirname, 'src/components/pages/post.vue')
        },
        {
          name: 'g-galaxyname-sort-time',
          path: '/g/:galaxyname/:sort?/:time?',
          component: resolve(__dirname, 'src/components/pages/galaxy.vue')
        },
        {
          name: 'u-username-sort-time',
          path: '/u/:username/:sort?/:time?',
          component: resolve(__dirname, 'src/components/pages/user.vue')
        },
        {
          name: 'search-sort-time',
          path: '/search/:sort?/:time?',
          component: resolve(__dirname, 'src/components/pages/search.vue')
        },
        {
          name: 'home-sort-time',
          path: '/home/:sort?/:time?',
          component: resolve(__dirname, 'src/components/pages/home.vue')
        }
      )
      sortRoutes(routes)
    }
  } */
}
