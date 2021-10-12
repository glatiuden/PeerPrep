<template>
  <v-app>
    <SideNav :drawer="drawer" :mini-variant="miniVariant" />
    <AppBar
      @update-drawer="(value) => (drawer = value)"
      @update-variant="(value) => (miniVariant = value)"
    />
    <v-main class="background">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>-->
    <!-- <AppFooterBasic /> -->
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
