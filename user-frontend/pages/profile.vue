<template>
  <div v-if="initial_loading" class="d-flex justify-center my-8">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <div v-else class="fill-height pa-4 py-sm-8 pb-sm-12 mx-auto app-max-width">
    <div class="mb-4 light_primary rounded-lg pa-6">
      <h1 class="font-weight-medium">Welcome back to PeerPrep, Vinleon</h1>
      <span>What do you want to do today?</span>
      <v-chip-group>
        <v-chip color="primary">View Questions</v-chip>
        <v-chip color="secondary">Find a random match</v-chip>
      </v-chip-group>
    </div>
    <v-row justify="start" align="start">
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
        <h3>Match History</h3>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

import BaseAvatar from "@/components/Profile/BaseAvatar";
import BaseElo from "@/components/Profile/BaseElo";

export default {
  name: "Profile",
  components: {
    BaseAvatar,
    BaseElo,
  },
  mixins: [systemMixin, userMixin],
  data() {
    return {
      initial_loading: false,
    };
  },
};
</script>

<style scoped>
.dashboard-background {
  background-color: #fdfeff;
}

.max-width {
  max-width: 92em;
}

.job-title {
  font-size: 18px;
}
</style>
