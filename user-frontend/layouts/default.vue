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
    <v-dialog
      v-if="open_matching_dialog"
      v-model="open_matching_dialog"
      max-width="550px"
    >
      <BaseWaitMatchDialog />
    </v-dialog>

    <v-dialog v-model="open_elo_match_dialog" max-width="400px">
      <BaseEloMatchDialog />
    </v-dialog>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import userMixin from "@/mixins/user";

import AppBar from "@/components/AppBar";
import BaseEloMatchDialog from "@/components/Match/BaseEloMatchDialog";
import BaseWaitMatchDialog from "@/components/Match/BaseWaitMatchDialog";

export default {
  components: {
    AppBar,
    BaseEloMatchDialog,
    BaseWaitMatchDialog,
  },
  mixins: [userMixin],
  middleware: ["authenticated"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      miniVariant: false,
      right: true,
    };
  },
  computed: {
    ...mapGetters({
      open_elo_match_dialog: "match/open_elo_match_dialog",
      open_matching_dialog: "match/open_matching_dialog",
    }),
  },
};
</script>
