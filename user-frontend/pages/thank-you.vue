<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else>
    <v-banner single-line color="light_primary">
      <v-row justify="center" align="center">
        <v-col cols="12" md="3" lg="2">
          <Lottie
            class="my-auto"
            :options="lottieOptions"
            :width="is_mobile ? 200 : 300"
            :height="300"
          />
        </v-col>
        <v-col align="center" cols="12" md="3" class="my-auto">
          <h1 class="my-3">
            <span class="font-weight-medium">Great Job,</span>
            <span class="primary--text">{{ user.display_name }}!</span>
          </h1>
          <h4 class="my-4 font-weight-medium">
            You have just completed a technical challenge!
          </h4>
          <div class="my-3">
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
              @click="$router.push(`/history/${match._id}`)"
              >View Match History</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-banner>
    <div class="app-max-width mx-auto mt-2 px-6">
      <v-row align="stretch">
        <v-col cols="12" md="6">
          <h2 class="text-center my-3">Sample Solution</h2>
          <pre
            class="pre fill-height my-2"
          ><samp>{{ match_question.solution }}</samp></pre>
        </v-col>
        <v-col cols="12" md="6">
          <div v-if="hide_ratings">
            <h2 class="text-center my-3">Featured Topics</h2>
            <v-row align-content="start" align="stretch">
              <v-col
                v-for="(topic, index) in question_topics"
                :key="index"
                cols="6"
              >
                <BaseQuestionCategoryCard :topic="topic" :index="index" />
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <h2 class="text-center my-3">Rate your Partner! 😄</h2>
            <v-card
              class="
                d-flex
                flex-column
                pa-3
                soft-box-shadow
                rounded-lg
                fill-height
              "
            >
              <v-card-subtitle class="text-center my-2">
                Please help us by rating your partner! This allows us to improve
                our matching criteria. <br />It will help us to match users with
                higher compatibility in the future!
              </v-card-subtitle>
              <v-card-text class="text-center">
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
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="success"
                  :loading="loading"
                  depressed
                  @click="rateUser"
                >
                  Submit <v-icon right>mdi-send-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
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
import matchMixin from "@/mixins/match";
import systemMixin from "@/mixins/system";

export default {
  name: "ThankYou",
  mixins: [userMixin, questionMixin, matchMixin, systemMixin],
  data() {
    return {
      lottieOptions: { animationData: completedLottie, loop: true },
      elo_rating: 0,
      match_question: undefined,
      hide_ratings: false,
    };
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      this.match_id = localStorage.getItem("match_id");
      // If match is not in store, retrieve from server
      if (!this.match) {
        await this.GET_MATCH({ match_id: this.match_id });
      }
      this.match_question = _.get(this.match, "question"); // Set it to data to be passed to question component
      if (_.isEmpty(this.question_topics)) {
        await this.GET_QUESTION_TOPICS();
      }
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching match: ${err}`);
    } finally {
      this.SET_LOADING({ data: false });
      // localStorage.removeItem("match_id");
    }
  },
  methods: {
    async rateUser() {
      try {
        this.SET_LOADING({ data: true });
        await this.CREATE_RATING({
          match_id: this.match_id,
          user_id: this.user_id,
          rating: this.elo_rating,
        });
        this.$notification.success(
          `Thank you for your ratings! We hope you have enjoy PeerPrepping!`,
        );
        this.hide_ratings = true;
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error create ratings: ${err}`);
      } finally {
        this.SET_LOADING({ data: false });
        // localStorage.removeItem("match_id");
      }
    },
  },
};
</script>
