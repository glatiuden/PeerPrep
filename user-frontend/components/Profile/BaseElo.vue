<template>
  <v-card class="rounded-lg soft-box-shadow px-2">
    <v-card-title class="text-uppercase text-body-1 font-weight-bold d-flex">
      <v-icon color="primary" left>mdi-finance</v-icon>
      Elo Tier
      <v-btn
        icon
        class="text--secondary"
        color="#0560AD"
        @click="open_info_dialog = !open_info_dialog"
      >
        <v-icon color="#0560AD">mdi-information</v-icon>
      </v-btn>
      <v-dialog v-model="open_info_dialog" max-width="600" max-height="400">
        <v-card>
          <v-card-title class="justify-center text-h6">
            Elo Tiers
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Tier</th>
                  <th class="text-left">Elo Required</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ranking, index) in elo_rankings" :key="index">
                  <td>{{ ranking.text }}</td>
                  <td>{{ ranking.elo }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-dialog>
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
  data() {
    return {
      open_info_dialog: false,
    };
  },
  computed: {
    /**
     * @description Get the next percentage to rank up
     */
    user_percentage() {
      const percentage =
        1 - (this.next_tier.elo - this.user.elo) / this.next_tier.elo;
      return percentage * 100;
    },
    /**
     * @description Get current tier
     */
    current_tier() {
      const current_tiers = _.filter(
        this.elo_rankings,
        ({ elo }) => elo <= this.user.elo,
      );

      if (current_tiers.length === 0) {
        return this.elo_rankings[this.elo_rankings.length - 1];
      }

      return current_tiers[current_tiers.length - 1];
    },
    /**
     * @description Get next tier
     */
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
