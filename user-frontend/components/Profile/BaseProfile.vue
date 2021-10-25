<template>
  <div v-if="initial_loading" class="d-flex justify-center my-8">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else class="fill-height">
    <div class="mb-6 light_primary rounded-lg pa-10">
      <div class="mx-auto app-max-width px-4">
        <h1>
          <span class="font-weight-medium"> Welcome back to PeerPrep,</span>
          {{ user.display_name }}
        </h1>
        <span>What do you want to do today?</span>
        <v-chip-group class="mt-3">
          <v-chip color="primary">
            <v-icon class="mr-1" small>mdi-help-circle-outline</v-icon>
            View questions
          </v-chip>
          <v-chip color="secondary">
            <v-icon class="mr-1" small>mdi-handshake-outline</v-icon>
            Start a match</v-chip
          >
        </v-chip-group>
      </div>
    </div>
    <v-row class="mx-auto app-max-width" justify="start" align="start">
      <v-col cols="12" sm="12" md="12" lg="3" xl="3">
        <v-row class="d-flex flex-column">
          <v-col>
            <BaseAvatar />
          </v-col>
          <v-col>
            <BaseElo />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="9" xl="9">
        <BaseMatchHistory />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

import BaseAvatar from "@/components/Profile/BaseAvatar";
import BaseElo from "@/components/Profile/BaseElo";
import BaseMatchHistory from "@/components/Profile/BaseMatchHistory";

export default {
  name: "BaseProfile",
  components: {
    BaseAvatar,
    BaseElo,
    BaseMatchHistory,
  },
  mixins: [systemMixin, userMixin],
  data() {
    return {
      initial_loading: false,
    };
  },
};
</script>
