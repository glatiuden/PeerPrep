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
          <BaseQuestionDetails :question="match_question" />
          <BaseMatchDetails
            :is-history-mode="is_history_mode"
            @end-match="endMatch"
          />
        </div>
      </v-col>
      <v-col md="12" lg="6">
        <BaseCodeEditor
          :match-id="match_id"
          class="mx-md-5 mx-lg-0"
          :is-history-mode="is_history_mode"
        />
      </v-col>
      <v-col md="12" lg="3">
        <div class="sticky-column mx-5 mr-lg-5">
          <BaseChat :match-id="match_id" :is-history-mode="is_history_mode" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import systemMixin from "@/mixins/system";
import matchMixin from "@/mixins/match";

import BaseQuestionDetails from "@/components/Session/BaseQuestionDetails";
import BaseMatchDetails from "@/components/Session/BaseMatchDetails";
import BaseChat from "@/components/Session/BaseChat";
import BaseCodeEditor from "@/components/Session/BaseCodeEditor";

export default {
  name: "Match",
  components: {
    BaseQuestionDetails,
    BaseMatchDetails,
    BaseChat,
    BaseCodeEditor,
  },
  mixins: [matchMixin, systemMixin],
  // beforeRouteLeave(to, from, next) {
  //   if (this.match_ended) {
  //     next();
  //     return;
  //   }

  //   const answer = confirm(
  //     "Do you really want to leave? Your match is still ongoing!",
  //   );

  //   if (answer) {
  //     this.endMatch();
  //   } else {
  //     next(false);
  //   }
  // },
  data() {
    return {
      match_id: undefined,
      match_question: undefined,
      match_ended: false,
      is_history_mode: false,
    };
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      // Retrieve Match ID either from localStorage or URL params
      this.match_id = localStorage.getItem("match_id") || this.$route.params.id;
      // If match is not in store, retrieve from server
      if (!this.match) {
        await this.GET_MATCH({ match_id: this.match_id });
      }
      // Set it to data to be passed to question component
      this.match_question = _.get(this.match, "question");

      this.is_history_mode = Boolean(this.$route.query.history);
      // this.checkIsValidMatch();
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching match: ${err}`);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
  methods: {
    /**
     * @description Check if the match is valid based on the ID
     */
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
    /**
     * @description Ends the page and re-route user to thank you page
     */
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
