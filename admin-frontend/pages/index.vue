<template>
  <v-container>
    <div class="mx-auto app-max-width">
      <h1>
        <span class="font-weight-medium"> Welcome back to PeerPrep,</span>
        {{ admin.display_name }}
      </h1>
      <span>What do you want to do today?</span>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="card-background-0" @click="$router.push('/users')">
            <v-card-title class="white--text text-h5 font-weight-bold">
              View Users
            </v-card-title>
            <v-card-subtitle class="white--text">
              View the list of users on PeerPrep
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="card-background-1" @click="$router.push('/question')">
            <v-card-title class="white--text text-h5 font-weight-bold">
              View Questions
            </v-card-title>
            <v-card-subtitle class="white--text">
              View and maintain the questions on PeerPrep
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="card-background-2" @click="$router.push('/match')">
            <v-card-title class="white--text text-h5 font-weight-bold">
              View Matches
            </v-card-title>
            <v-card-subtitle class="white--text">
              View the users' match history on PeerPrep
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import systemMixin from "@/mixins/system";
import authMixin from "@/mixins/auth";

export default {
  name: "Index",
  mixins: [systemMixin, authMixin],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
<style>
.card-background-0 {
  background: rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
}

.card-background-1 {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}

.card-background-2 {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
</style>
