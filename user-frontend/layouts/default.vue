<template>
  <v-app>
    <AppBar />
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" app>
      PeerPrep
      <v-spacer></v-spacer>
      <span class="float-right">
        &copy; {{ new Date().getFullYear() }} All rights reserved.
      </span>
    </v-footer>
  </v-app>
</template>
<script>
import AppBar from "@/components/AppBar";
import userMixin from "@/mixins/user";

export default {
  components: {
    AppBar,
  },
  mixins: [userMixin],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  async fetch() {
    const login_token = localStorage.getItem("login_token");
    const has_login_token =
      login_token !== "undefined" && login_token !== "null" && !!login_token;

    if (has_login_token) {
      try {
        await this.AUTH_USER();
      } catch (err) {
        localStorage.removeItem("login_token");
      }
    } else {
      localStorage.removeItem("login_token");
    }
  },
};
</script>
