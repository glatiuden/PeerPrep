<template>
  <div>
    <v-banner single-line color="light_primary">
      <v-row justify="center" align="center">
        <v-col cols="2">
          <Lottie
            class="my-auto"
            :options="lottieOptions"
            :width="is_mobile ? 200 : 300"
            :height="300"
          />
        </v-col>
        <v-col cols="3" class="my-auto">
          <h1 class="my-3">Great Job, {{ user.display_name }}!</h1>
          <h4 class="my-4 font-weight-medium">
            You have just completed a technical challenge!
          </h4>
          <div class="d-flex my-3">
            <v-btn
              outlined
              color="primary"
              large
              class="mr-3"
              @click="$router.push('/')"
              >Go Back Home</v-btn
            >
            <v-btn
              color="primary"
              large
              depressed
              @click="$router.push(`/history/${match_id}`)"
              >View Match History</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-banner>
    <div class="app-max-width mx-auto">
      <v-row>
        <v-col cols="6">
          <h2 class="text-center my-3">Featured Topics</h2>
          <v-row align-content="start" align="stretch">
            <v-col
              v-for="(topic, index) in question_topics"
              :key="index"
              cols="6"
            >
              <BaseQuestionCategoryCard
                :topic="topic"
                :index="index"
                @perform-filter="performFilter"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <h2 class="text-center my-3">Rate your partner! 😄</h2>

          <v-card class="pa-3 my-4 soft-box-shadow">
            <v-card-subtitle class="text-center my-2">
              By rating your partner, we will have a better idea where is your
              partner position and it will help us to match users better in the
              future!
            </v-card-subtitle>
            <v-card-text class="text-center">
              <div class="ma-0 ma-sm-4 my-4 my-sm-8">
                <span class="text-h6">
                  1 is the lowest satisfaction, 5 is highest satisfaction
                </span>
                <v-rating
                  v-model="elo_rating"
                  class="text-center"
                  color="yellow darken-3"
                  background-color="grey lighten-1"
                  empty-icon="$ratingFull"
                  half-increments
                  hover
                  large
                ></v-rating>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                :disabled="invalid"
                :loading="loading"
                @click="$emit('proceed-ratings')"
              >
                Submit <v-icon right>mdi-send-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import completedLottie from "@/assets/completed-lottie.json";
import BaseQuestionCategoryCard from "@/components/Question/BaseQuestionCategoryCard";
import userMixin from "@/mixins/user";
import questionMixin from "@/mixins/question";

export default {
  name: "ThankYou",
  components: { BaseQuestionCategoryCard },
  mixins: [userMixin, questionMixin],
  data() {
    return {
      lottieOptions: { animationData: completedLottie, loop: true },
      elo_rating: 0,
    };
  },
  async fetch() {
    try {
      await this.GET_QUESTION_TOPICS();
    } catch (err) {
      console.error(err);
    }
  },
};
</script>
