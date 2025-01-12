// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true},
  
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    'nuxt-vue3-google-signin',
    '@nuxt/content'
    
    
    // 'nuxt-primevue',
    // '@headlessui/vue',
  ],

  googleSignIn: {
    // cherry账号：https://console.cloud.google.com/auth/branding?authuser=0&inv=1&invt=AbhyQA&project=ai-hair
    clientId: '600529785833-bulosgjnibgo4jlinfhpo0opj6ms0t55.apps.googleusercontent.com',    
  },

  router: {},

  // primevue: {
  //   components: {
  //     exclude: ['Chart']
  //   },
  //   options: {
  //     ripple: true
  //   }
  // },

  i18n: {
    // baseUrl: "https://xaaimusic.com",
    locales: [
      { code: "en", file: "en.json", iso: "en-US", hl: "en" }, // 英语（美国）
      // { code: "fr", file: "fr.json", iso: "fr-FR", hl: "fr" }, // 法语（法国）
      // { code: "de", file: "de.json", iso: "de-DE", hl: "de" }, // 德语（德国）
      // { code: "es", file: "es.json", iso: "es-ES", hl: "es" }, // 西班牙语（西班牙）
      // { code: "ja", file: "ja.json", iso: "ja-JP", hl: "ja" }, // 日语（日本）
      // { code: "ko", file: "ko.json", iso: "ko-KR", hl: "ko" }, // 韩语（韩国）
      // { code: "pt", file: "pt.json", iso: "pt-PT", hl: "pt" }, // 葡萄牙语（葡萄牙）
      // { code: "tw", file: "tw.json", iso: "zh-TW", hl: "zh-TW" }, // 中文（台湾）
      // { code: "zh", file: "zh.json", iso: "zh-CN", hl: "zh-CN" }, // 中文（中国）
      // { code: "ar", file: "ar.json", iso: "ar-SA", hl: "ar" }, // 阿拉伯语（沙特阿拉伯）
      // { code: "hi", file: "hi.json", iso: "hi-IN", hl: "hi" }, // 印地语（印度）
      // { code: "it", file: "it.json", iso: "it-IT", hl: "it" }, // 意大利语（意大利）
      // { code: "ru", file: "ru.json", iso: "ru-RU", hl: "ru" }, // 俄语（俄罗斯）
    ],
    defaultLocale: "en",
    lazy: true,
    langDir: "locales/",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    // vueI18n: {
    //   legacy: false,
    //   locale: 'tr',
    //   fallbackLocale: 'tr',
    //   availableLocales: ['en', 'tr'],
    // },
  },

  plugins: [

  ],

  runtimeConfig: {
     // 私有键 - 仅在服务器端可用
     CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
     R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
     R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
     R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,

    public: {
      gtagId: process.env.GOOGLE_TAG_ID,
      clarityId: process.env.CLARITY_ID,
      domain: process.env.DOMAIN,
      domainStat: process.env.DOMAIN_STAT,
      serverUrl: process.env.SERVER_URL,
      yandexId: process.env.YANDEX_ID,
      bingId: process.env.BING_ID,
      merchId: 8,
      defaultProductId: 112, // 默认的价格id
      defaultPayChannelId: 1, // 1代表paypal
      langs: [
        {"code":"en","file":"en.json","iso":"en-US","hl":"en","name":"English"},
        // {"code":"fr","file":"fr.json","iso":"fr-FR","hl":"fr","name":"Français"},
        // {"code":"de","file":"de.json","iso":"de-DE","hl":"de","name":"Deutsch"},
        // {"code":"es","file":"es.json","iso":"es-ES","hl":"es","name":"Español"},
        // {"code":"ja","file":"ja.json","iso":"ja-JP","hl":"ja","name":"日本語"},
        // {"code":"ko","file":"ko.json","iso":"ko-KR","hl":"ko","name":"한국어"},
        // {"code":"pt","file":"pt.json","iso":"pt-PT","hl":"pt","name":"Português"},
        // {"code":"tw","file":"tw.json","iso":"zh-TW","hl":"zh-TW","name":"繁體中文"},
        // {"code":"zh","file":"zh.json","iso":"zh-CN","hl":"zh-CN","name":"简体中文"},
        // {"code":"ar","file":"ar.json","iso":"ar-SA","hl":"ar","name":"العربية"},
        // {"code":"hi","file":"hi.json","iso":"hi-IN","hl":"hi","name":"हिन्दी"},
        // {"code":"it","file":"it.json","iso":"it-IT","hl":"it","name":"Italiano"},
        // {"code":"ru","file":"ru.json","iso":"ru-RU","hl":"ru","name":"Русский"}
      ],
      company: {
        name: 'Unblur app',
        tagline: 'Connect with us on social media',
        copyright: 'All rights reserved.'
      },
      social: {
        twitter: 'https://x.com/unblurimage',
        linkedin: '',
        github: 'https://github.com/unblurapp',
        youtube: 'https://www.youtube.com/@unblur-app',  // 空字符串表示不显示该平台
        brandfetch: 'https://brandfetch.com/unblur.app',
        friendlink2:'https://www.aiheron.com/',
        friendlink:'https://www.aitoolnet.com/'
      }
    },
     // 公共键 - 在客户端也可用
     R2_PUBLIC_URL: process.env.R2_PUBLIC_URL,
  },

  nitro: {
    debug: true  // 启用调试日志
  },

  compatibilityDate: "2024-08-14",
  // 添加 server 配置来设置端口
  // nitro: {
  //   port: 3020
  // },
});
