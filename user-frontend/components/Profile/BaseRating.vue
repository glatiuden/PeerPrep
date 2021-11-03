<template>
  <v-card class="rounded-lg soft-box-shadow px-2">
    <v-card-title class="text-uppercase text-body-1 font-weight-bold d-flex">
      <v-icon color="#FF9529" left>mdi-star-circle</v-icon>
      Average Ratings
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text class="pb-5">
      <v-card
        class="rounded-lg justify-center"
        color="light_primary"
        elevation="0"
      >
        <v-card-text class="py-2 text-center">
          <v-rating
            color="yellow darken-3"
            :value="rating"
            background-color="grey lighten-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            readonly
          ></v-rating>
          You have received an average of <b>{{ rating.toFixed(2) }}</b> stars
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
      rating: 0,
    };
  },
  async fetch() {
    try {
      this.rating = await this.GET_AVERAGE_RATING({
        receiver_id: this.user_id,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
<style>
.level-caption {
  font-size: 13px;
  color: black;
}
</style>
