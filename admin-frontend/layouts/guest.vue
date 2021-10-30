<template>
  <v-app>
    <v-app-bar
      color="background"
      class="app-bar soft-box-shadow"
      app
      height="72px"
    >
      <v-container fluid>
        <v-row
          :justify="is_mobile ? 'center' : 'start'"
          align="center"
          class="navbar_main"
        >
          <v-img
            :max-height="60"
            :max-width="is_mobile ? 120 : 160"
            contain
            :src="require('~/assets/logo.png')"
            class="clickable"
            @click="$router.push('/')"
          ></v-img>
        </v-row>
      </v-container>
    </v-app-bar>

    <nuxt />
    <v-footer :absolute="true" app>
      PeerPrep
      <v-spacer></v-spacer>
      <span class="float-right">
        &copy; {{ new Date().getFullYear() }} All rights reserved.
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import systemMixin from "@/mixins/system";

export default {
  mixins: [systemMixin],
  middleware: ["authenticated"],
};
</script>
