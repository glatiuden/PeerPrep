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
    <v-dialog v-model="open_elo_match_dialog" max-width="400px">
      <BaseEloMatchDialog />
    </v-dialog>
  </v-app>
</template>
<script>
import AppBar from "@/components/AppBar";
import userMixin from "@/mixins/user";
import BaseEloMatchDialog from "@/components/Match/BaseEloMatchDialog";
import { mapGetters } from "vuex";

export default {
  components: {
    AppBar,
    BaseEloMatchDialog,
  },
  mixins: [userMixin],
  middleware: ["authenticated"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
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
  computed: {
    ...mapGetters({
      open_elo_match_dialog: "match/open_elo_match_dialog",
    }),
  },
};
</script>
