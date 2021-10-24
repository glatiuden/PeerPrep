<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else>
    <BaseChat :match-id="match_id" />
    <v-row class="mx-auto my-2">
      <v-col cols="12" lg="3" style="position: relative">
        <div class="scrollable-column">
          <BaseQuestion :question="match_question" />
          <v-card outlined class="mt-3">
            <v-card-title> Match Details</v-card-title>
            <v-card-text>
              <v-countdown
                :left-time="match_question.recommended_duration * 60000"
              >
                <template #process="{ timeObj }">
                  <p>
                    <b>{{ `Time Left: ${timeObj.m}:${timeObj.s}` }}</b>
                  </p>
                </template>
              </v-countdown>
              Partner's Display Name: <b>{{ match.user.display_name }}</b>
              <br />
              Programming Language:
              <b class="text-capitalize">{{ match.programming_language }}</b>
            </v-card-text>
            <v-card-actions class="mx-2">
              <v-btn color="error" depressed @click="endMatch">End Match</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" lg="5">
        <BaseCodeEditor :match-id="match_id" />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import systemMixin from "@/mixins/system";
import editorMixin from "@/mixins/editor";
import matchMixin from "@/mixins/match";

import BaseChat from "@/components/Match/BaseChat";
import BaseCodeEditor from "@/components/Match/BaseCodeEditor";
import BaseVideoChat from "@/components/Match/BaseVideoChat";
import BaseQuestion from "@/components/Match/BaseQuestion";

export default {
  components: {
    BaseChat,
    BaseCodeEditor,
    BaseVideoChat,
    BaseQuestion,
  },
  mixins: [editorMixin, matchMixin, systemMixin],
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
