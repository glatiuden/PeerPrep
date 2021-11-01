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
              <v-countdown
                v-if="match.match_requirements.question_mode === 'timed'"
                :left-time="match_question.recommended_duration * 60000"
              >
                <template #process="{ timeObj }">
                  <p>
                    <b>{{ `Time Left: ${timeObj.m}:${timeObj.s}` }}</b>
                  </p>
                </template>
              </v-countdown>
              Partner's Display Name: <b>{{ partner_info.display_name }}</b>
              <br />
              Programming Language:
              <b class="text-capitalize">{{
                match.match_requirements.programming_language
              }}</b>
            </v-card-text>
            <v-card-actions class="mx-2">
              <v-btn color="error" block depressed @click="endMatch"
                >End Match</v-btn
              >
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
  data() {
    return {
      match_id: undefined,
      match_question: undefined,
      show: false,
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
  },
  methods: {
    async endMatch() {
      try {
        this.SET_LOADING({ data: true });
        await this.END_MATCH({ match_id: this.match_id });
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
<style>
.sticky-top {
  position: sticky;
  top: 0;
}
</style>
