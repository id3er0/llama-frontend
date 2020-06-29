import Fiber from 'fibers';
import Sass from 'sass';
import './env-config';

const customSass = {
  implementation: Sass,
  fiber: Fiber,
};

const title = 'Llamaspace';
const description = '[Description]';
const meta_image_url = '/images/meta-image.jpg';


const head = {
  title,
  meta: [
    {charset: 'utf-8'},
    {name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1'},
    {hid: 'description', name: 'description', content: description},
    {hid: 'og_title', property: 'og:title', content: title},
    {hid: 'og_description', property: 'og:description', content: description},
    {hid: 'og_type', property: 'og:type', content: 'website'},
    {hid: 'og_image', property: 'og:image', content: meta_image_url},
    {hid: 'fb_app_id', property: 'fb:app_id', content: process.env.NUXT_ENV_FB_APP_ID},
    {hid: 'twitter_title', name: 'twitter:title', content: title},
    {hid: 'twitter_description', name: 'twitter:description', content: description},
    {hid: 'twitter_card', name: 'twitter:card', content: 'summary'},
    {hid: 'twitter_image', name: 'twitter:image', content: meta_image_url},
  ],
  link: [
    {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
    // {
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css2?family=xxx',
    // },
  ],
};

// Add icons.
head.meta = [
  ...head.meta,
  {name: 'msapplication-TileColor', content: '#da532c'},
  {name: 'theme-color', content: '#ffffff'},
];
head.link = [
  ...head.link,
  {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
  {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
  {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
  {rel: 'manifest', href: '/site.webmanifest'},
  {rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5'},
];

module.exports = {
  /*
  ** Mode
  */
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head,

  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},

  /*
  ** Build configuration
  */
  build: {
    // Fix building:
    // - https://nuxtjs.org/guide/release-notes#-code-core-js-3-code-
    babel: {
      presets({isServer}) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {version: 3},
            },
          ],
        ];
      },
    },
    loaders: {
      scss: customSass,
    },
    // postcss: [
    //   require('postcss-scrollbar')(),
    // ],
    vendor: [
      'vue-notifications',
    ],
    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  /*
  ** Plugins
   */
  plugins: [
    {src: '~/plugins/vue-simple-svg.js'},
  ],

  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/style-resources', // Globally import Sass files
    'nuxt-webfontloader',
    ['nuxt-vuex-localstorage', {
      // localStorage: [
      //   'cookies',
      // ],
      // sessionStorage: [],
    }],
    ['@nuxtjs/firebase', {
      config: {
        apiKey: 'AIzaSyA9AhETz6sLfAUW9js3VvPFPbDss8Diic8',
        authDomain: 'llama-b0d43.firebaseapp.com',
        databaseURL: 'https://llama-b0d43.firebaseio.com',
        projectId: 'llama-b0d43',
        storageBucket: 'llama-b0d43.appspot.com',
        messagingSenderId: '620019218007',
        appId: '1:620019218007:web:9c6eaaec49a3fc3ac89512',
        // measurementId: '<measurementId>',
      },
      services: {
        // auth: true,
        firestore: true,
        storage: true,
      },
    }],
    '@nuxtjs/dayjs',
  ],

  /*
  ** Build modules
  */
  buildModules: [
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-123450000-0',
    // }],
  ],

  /*
  ** Globally import Sass files
  */
  styleResources: {
    // scss: [
    //   'normalize.css/normalize.css',
    //   'assets/styles/index.scss',
    // ],
  },

  /*
  ** Load fonts
  */
  webfontloader: {
    google: {
      families: [
        'Poppins:wght@400;500;700&display=swap',
      ],
    },
  },
};

