<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else class="black py-2 fill-height">
    <v-row class="fill-height">
      <v-col md="12" lg="3">
        <div class="sticky-column mx-5 ml-lg-5">
          <BaseQuestion :question="match_question" />
          <v-card outlined class="mt-3 white--text" color="#242424">
            <v-card-title> Match Details</v-card-title>
            <v-card-text class="white--text">
              <v-icon color="white" class="mr-1"
                >mdi-shield-sword-outline</v-icon
              >
              Match Mode:
              <v-chip
                small
                :color="mode_chip_colors[match.mode]"
                text-color="white"
              >
                {{ match.mode }}
              </v-chip>

              <br />

              <v-countdown
                v-if="match.match_requirements.question_mode === 'timed'"
                :left-time="time_left"
                @finish="endMatch"
              >
                <template #process="{ timeObj }">
                  <v-icon color="white" class="mr-1">mdi-timer</v-icon>
                  Time Left: <b>{{ `${timeObj.m}:${timeObj.s}` }}</b>
                  <br />
                </template>
              </v-countdown>
              <v-divider class="my-6 white"></v-divider>
              <v-icon color="white" class="mr-1">mdi-account</v-icon>
              Partner's Display Name: <b>{{ partner_info.display_name }}</b>
              <br />
              <v-icon color="white" class="mr-1">mdi-code-tags</v-icon>
              Programming Language:
              <b class="text-capitalize">{{
                match.match_requirements.programming_language
              }}</b>
            </v-card-text>
            <v-card-actions class="pb-6 mx-2">
              <v-btn color="error" block depressed @click="endMatch">
                End Match
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col md="12" lg="6">
        <BaseCodeEditor :match-id="match_id" class="mx-md-5 mx-lg-0" />
      </v-col>
      <v-col md="12" lg="3">
        <div class="sticky-column mx-5 mr-lg-5">
          <BaseChat :match-id="match_id" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import systemMixin from "@/mixins/system";
import matchMixin from "@/mixins/match";

import BaseChat from "@/components/Match/BaseChat";
import BaseCodeEditor from "@/components/Match/BaseCodeEditor";
import BaseQuestion from "@/components/Match/BaseQuestion";

export default {
  components: {
    BaseChat,
    BaseCodeEditor,
    BaseQuestion,
  },
  mixins: [matchMixin, systemMixin],
  beforeRouteLeave(to, from, next) {
    if (this.match_ended) {
      next();
      return;
    }

    const answer = confirm(
      "Do you really want to leave? Your match is still ongoing!",
    );

    if (answer) {
      this.endMatch();
    } else {
      next(false);
    }
  },
  data() {
    return {
      match_id: undefined,
      match_question: undefined,
      show: false,
      match_ended: false,
    };
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      this.match_id = localStorage.getItem("match_id") || this.$route.params.id; // Either from localStorage or URL params
      // If match is not in store, retrieve from server
      if (!this.match) {
        await this.GET_MATCH({ match_id: this.match_id });
      }
      this.match_question = _.get(this.match, "question"); // Set it to data to be passed to question component
      // this.checkIsValidMatch();
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching match: ${err}`);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
  computed: {
    partner_info() {
      const partner1_id = _.get(this.match, "partner1._id");
      if (partner1_id === this.user_id) {
        return this.match.partner1;
      }
      return this.match.partner2;
    },
    /**
     * @description Computes the exact duration left
     */
    time_left() {
      const updated_at = _.get(this.match, "updated_at");
      const recommended_duration = _.get(
        this.match_question,
        "recommended_duration",
      );
      const end_time = this.$moment(updated_at).add(
        recommended_duration,
        "minutes",
      );
      const time_left = end_time.diff(this.$moment(), "milliseconds");
      return time_left;
    },
  },
  methods: {
    async checkIsValidMatch() {
      const is_match_ended = _.get(this.match, "status") === "completed";
      if (is_match_ended) {
        this.$notification.error(`This match has already ended.`);
        this.match_ended = true;
        this.$router.push("/");
        return;
      }

      const no_partner2_id = !_.get(this.match, "partner2_id");
      const is_not_in_progress = _.get(this.match, "status") != "in-progress";
      const updated_at = _.get(this.match, "updated_at");
      const is_more_than_30s = this.$moment().isAfter(
        this.$moment(updated_at).add(30, "seconds"),
      );

      // Match is not in progress or does not have partner2_id
      if (is_not_in_progress || no_partner2_id) {
        // More than 30 seconds -> Update match status to cancelled
        if (is_more_than_30s) {
          await this.END_MATCH({ match_id: this.match_id });
          return;
        } else {
          // Match has not started, user not supposed to be on this page
          this.$notification.error(`Match has not started yet.`);
          this.match_ended = true;
          this.$router.push("/");
          return;
        }
      }

      const match_mode = _.get(this.match, "match_requirements.question_mode");
      const recommended_duration = _.get(
        this.match_question,
        "recommended_duration",
      );

      const is_timed_mode = match_mode === "timed";
      const is_after_match_duration = this.$moment().isAfter(
        this.$moment(updated_at).add(recommended_duration, "minutes"),
      );

      // If is timed mode and duration has ended
      if (is_timed_mode && is_after_match_duration) {
        this.$notification.error(`This match has already ended.`);
        this.match_ended = true;
        this.$router.push("/");
        return;
      }

      // If is OTOT mode and duration is after 12 hours
      const is_otot_mode = match_mode === "otot";
      const is_after_12_hours = this.$moment().isAfter(
        this.$moment(updated_at).add(12, "hours"),
      );

      if (is_otot_mode && is_after_12_hours) {
        this.$notification.error(`This match has already ended.`);
        this.match_ended = true;
        this.$router.push("/");
        return;
      }
    },
    async endMatch() {
      try {
        this.SET_LOADING({ data: true });
        await this.END_MATCH({ match_id: this.match_id });
        this.match_ended = true;
        this.$router.push("/thank-you");
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error ending match: ${err}`);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },
  },
};
</script>
