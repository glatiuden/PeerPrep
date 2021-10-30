<template>
  <v-app>
    <SideNav :drawer="drawer" />
    <AppBar @update-drawer="drawer = false" />
    <v-main class="background">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
import SideNav from "@/components/Layout/SideNav";
import AppBar from "@/components/Layout/AppBar";
import AppFooter from "@/components/Layout/AppFooter";

export default {
  components: {
    SideNav,
    AppBar,
    AppFooter,
  },
  middleware: ["authenticated"],
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
};
</script>
