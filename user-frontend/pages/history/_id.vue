<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else>
    <BaseChat :match-id="match_id" :is-history-mode="true" />
    <v-row class="mx-auto app-max-width my-2">
      <v-col cols="12" lg="5">
        <div>
          <BaseQuestion :question="match_question" />
          <v-card outlined class="mt-3">
            <v-card-title> Match Details</v-card-title>
            <v-card-text>
              Partner's Display Name: <b>{{ match.user.display_name }}</b>
              <br />
              Programming Language:
              <b class="text-capitalize">{{ match.programming_language }}</b>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" lg="7">
        <BaseCodeEditor :match-id="match_id" :is-history-mode="true" />
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
import BaseQuestion from "@/components/Match/BaseQuestion";

export default {
  components: {
    BaseChat,
    BaseCodeEditor,
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
      this.match_id = this.$route.params.id; // Either from localStorage or URL params
      await this.GET_MATCH({ match_id: this.match_id });
      this.match_question = _.get(this.match, "question"); // Set it to data to be passed to question component
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching match: ${err}`);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>
