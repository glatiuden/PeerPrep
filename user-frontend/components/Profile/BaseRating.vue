<template>
  <v-card class="rounded-lg soft-box-shadow px-2">
    <v-card-title class="text-uppercase text-body-1 font-weight-bold d-flex">
      <v-icon color="#FF9529" left>mdi-star-circle</v-icon>
      Average Ratings
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
            What are Ratings?
          </v-card-title>
          <v-card-text>
            <ul>
              <li>Ratings are given at the end of every Elo match up</li>
              <li>Upon completion, you will gain <b>50 points</b></li>
              <li>
                According to how many stars you are given for your performance,
                you will gain <b>0 ~ 50 additional points</b>
              </li>
            </ul>
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
  name: "BaseRating",
  mixins: [userMixin],
  data() {
    return {
      rating: 0,
      open_info_dialog: false,
    };
  },
  async fetch() {
    try {
      this.rating = await this.GET_AVERAGE_RATING({
        receiver_id: this.user_id,
      });
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching ratings: ${err}`);
    }
  },
};
</script>
