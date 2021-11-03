<template>
  <div v-if="initial_loading" class="d-flex justify-center my-8">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else class="fill-height">
    <div class="mb-6 light_primary rounded-lg py-10 px-6 px-lg-0">
      <div class="mx-auto app-max-width px-0">
        <h1>
          <span class="font-weight-medium"> Welcome back to PeerPrep,</span>
          {{ user.display_name }}
        </h1>
        <span>What do you want to do today?</span>
        <v-chip-group class="mt-3">
          <v-chip color="primary" @click="$router.push('/question')">
            <v-icon class="mr-1" small>mdi-help-circle-outline</v-icon>
            View Questions
          </v-chip>
          <v-chip
            color="secondary"
            @click="SET_OPEN_ELO_MATCH_DIALOG({ data: true })"
          >
            <v-icon class="mr-1" small>mdi-handshake-outline</v-icon>
            Start Match
          </v-chip>
        </v-chip-group>
      </div>
    </div>
    <div class="mx-auto app-max-width px-6 px-lg-0">
      <v-row justify="start" align="start">
        <v-col cols="12" sm="12" md="12" lg="3" xl="3">
          <v-row class="d-flex flex-column">
            <v-col>
              <BaseAvatar />
            </v-col>
            <v-col>
              <BaseElo />
            </v-col>
            <v-col>
              <BaseRating />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="9" xl="9">
          <BaseMatchHistory />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

import BaseAvatar from "@/components/Profile/BaseAvatar";
import BaseElo from "@/components/Profile/BaseElo";
import BaseMatchHistory from "@/components/Profile/BaseMatchHistory";
import BaseRating from "@/components/Profile/BaseRating";

export default {
  name: "BaseProfile",
  components: {
    BaseAvatar,
    BaseElo,
    BaseMatchHistory,
    BaseRating,
  },
  mixins: [systemMixin, userMixin],
  data() {
    return {
      initial_loading: false,
    };
  },
  methods: {
    ...mapMutations({
      SET_OPEN_ELO_MATCH_DIALOG: "match/SET_OPEN_ELO_MATCH_DIALOG",
    }),
  },
};
</script>
