<template>
  <v-card class="rounded-lg soft-box-shadow px-2">
    <v-card-title
      class="text-uppercase text-body-1 font-weight-bold d-flex my-2"
    >
      <v-icon color="primary" left>mdi-finance</v-icon>
      Elo Tier
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text class="pb-5">
      <v-card
        class="rounded-lg justify-center"
        color="light_primary"
        elevation="0"
      >
        <v-card-text class="py-5">
          <h3 class="text-uppercase">{{ current_tier.text }}</h3>
          <v-progress-linear
            class="my-3"
            color="primary"
            height="5"
            :value="user_percentage"
          ></v-progress-linear>
          <div class="d-flex">
            <div class="level-caption">
              <b>Next Tier:</b> {{ next_tier.text }}
            </div>
            <v-spacer></v-spacer>
            <div class="level-caption">
              <b>{{ user.elo }}</b
              >/<span class="grey--text">{{ next_tier.elo }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import userMixin from "@/mixins/user";

export default {
  name: "BaseElo",
  mixins: [userMixin],
  computed: {
    user_percentage() {
      const percentage =
        1 - (this.next_tier.elo - this.user.elo) / this.next_tier.elo;
      return percentage * 100;
    },
    current_tier() {
      const current_tier = _.find(
        this.elo_rankings,
        ({ elo }) => elo <= this.user.elo,
      );

      return current_tier;
    },
    next_tier() {
      const next_tier = _.find(
        this.elo_rankings,
        ({ elo }) => elo > this.user.elo,
      );
      return next_tier;
    },
  },
};
</script>
<style>
.level-caption {
  font-size: 13px;
  color: black;
}
</style>
