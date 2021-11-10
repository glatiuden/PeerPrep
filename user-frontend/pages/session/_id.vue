<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  />
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
        <div class="sticky-column">
          <BaseCodeEditor
            :match-id="match_id"
            class="mx-md-5 mx-lg-0"
            :is-history-mode="is_history_mode"
          />
        </div>
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
import userMixin from "@/mixins/user";

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
  mixins: [matchMixin, systemMixin, userMixin],
  beforeRouteLeave(to, from, next) {
    if (this.match_ended || this.is_history_mode) {
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
      match_ended: false,
      is_history_mode: false,
    };
  },
  async fetch() {
    if (!this.has_user) {
      this.$router.push("/");
      return;
    }

    try {
      this.SET_LOADING({ data: true });
      // Retrieve Match ID either from localStorage or URL params
      this.match_id = localStorage.getItem("match_id") || this.$route.params.id;
      // If match is not in store, retrieve from server
      this.is_history_mode = Boolean(this.$route.query.history);

      if (!this.match || this.is_history_mode) {
        await this.GET_MATCH({ match_id: this.match_id });
      }
      // Set it to data to be passed to question component
      this.match_question = _.get(this.match, "question");

      this.checkIsValidMatch();
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching match: ${err}`);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },

  methods: {
    /**
     * @description Redirect user to home page
     */
    redirectUser() {
      this.$notification.error(`This match has already ended.`);
      this.match_ended = true;
      this.$router.push("/");
    },
    /**
     * @description Check if the match is valid based on the ID
     */
    async checkIsValidMatch() {
      const is_match_ended = _.get(this.match, "status") === "completed";
      if (is_match_ended) {
        this.$router.push(`/session/${this.match._id}?history=true`);
        await this.GET_MATCH({ match_id: this.match_id });
        return;
      }

      const is_not_in_progress = _.get(this.match, "status") != "in-progress";
      if (is_not_in_progress) {
        this.$notification.error(`This match has not in progress.`);
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
