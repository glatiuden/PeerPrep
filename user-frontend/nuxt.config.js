const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "PeerPrep",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/lodash",
    "~/plugins/axios",
    "~/plugins/vuetify",
    { src: "@/plugins/ace-editor", mode: "client", ssr: false },
    { src: "@/plugins/vue-lottie", mode: "client", ssr: false },
    { src: "@/plugins/vue-chat-scroll", mode: "client", ssr: false },
    { src: "@/plugins/vue-webrtc", mode: "client", ssr: false },
    { src: "@/plugins/vue-notification", mode: "client", ssr: false },
    { src: "@/plugins/vue-awesome-countdown", mode: "client", ssr: false },
    { src: "@/plugins/avatar", mode: "client", ssr: false },
    { src: "@/plugins/password-strength", mode: "client", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
    "nuxt-compress",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "nuxt-socket-io"],
  io: {
    // module options
    sockets: [
      {
        name: "match",
        default: true,
        url: `${process.env.SERVER_URL}/match`,
        // url: `http://localhost:3003`,
      },
      {
        name: "chat",
        url: `${process.env.SERVER_URL}/chat`,
        // url: `http://localhost:3005`,
      },
      {
        name: "video-chat",
        url: `${process.env.SERVER_URL}/video-chat`,
        // url: `http://localhost:3007`,
      },
    ],
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      themes: {
        light: {
          primary: "#1E3888",
          secondary: "#47A8BD",
          accent: "#F5E663",
          error: "#9C3848",
          warning: "#FFAD69",
          light_primary: "#F2F6FA",
        },
      },
    },
  },

  /**
   * For axios configuration
   */
  axios: {
    baseURL:
      process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging"
        ? process.env.SERVER_URL
        : "https://server.peerprep.tech",

    https: false, // Set to true if want to use https
    progress: true, // Show progress bar
    retry: { retries: 3 }, // number of API call retries
    credentials: false,
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },

  publicRuntimeConfig: {
    SERVER_URL:
      process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging"
        ? process.env.SERVER_URL
        : "https://server.peerprep.tech",
  },

  env: {
    SERVER_URL:
      process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "staging"
        ? process.env.SERVER_URL
        : "https://server.peerprep.tech",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new MonacoWebpackPlugin({
        languages: ["json"],
      }),
    ],
  },

  server: {
    port: 8082, // default: 3000
  },
};
