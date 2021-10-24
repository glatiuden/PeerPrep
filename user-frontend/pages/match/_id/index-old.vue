<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <v-row v-else class="app-max-width mx-auto my-4">
    <v-col cols="12">
      <v-card outlined>
        <v-card-title
          >Question: {{ match_question.title }}
          <v-spacer></v-spacer>
          <v-countdown :left-time="match_question.recommended_duration * 60000">
            <template #process="{ timeObj }">
              <b>{{ `Time Left: ${timeObj.m}:${timeObj.s}` }}</b>
            </template>
          </v-countdown>
        </v-card-title>
        <v-card-text>
          <p>
            <v-icon class="mr-1">mdi-code-tags</v-icon>
            <b>Difficulty:</b>
            <v-chip
              small
              :color="difficulty_chip_colors[match_question.difficulty]"
              text-color="white"
            >
              {{ match_question.difficulty }}
            </v-chip>
          </p>
          <p>
            <v-icon class="mr-1">mdi-book</v-icon>
            <b>Topic:</b>
            <v-chip small color="primary">{{ match_question.topic }}</v-chip>
          </p>
          <p class="font-weight-bold ma-0">
            <v-icon class="mr-1">mdi-text-long</v-icon>
            Description:
          </p>
          <div class="ml-8">{{ match_question.description }}</div>
        </v-card-text>
        <!-- <v-card-actions class="pb-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed>Hint</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
    <v-col cols="12">
      <div class="d-flex">
        Selected Language: {{ match.programming_language }}
      </div>
    </v-col>
    <v-col cols="12" lg="8">
      <BaseCodeEditor />
    </v-col>
    <v-col>
      <!-- <BaseChat /> -->
    </v-col>
  </v-row>
</template>
<script>
import systemMixin from "@/mixins/system";
import editorMixin from "@/mixins/editor";
import matchMixin from "@/mixins/match";

import BaseChat from "@/components/Match/BaseChat";
import BaseCodeEditor from "@/components/Match/BaseCodeEditor";

export default {
  components: {
    BaseChat,
    BaseCodeEditor,
  },
  mixins: [editorMixin, matchMixin, systemMixin],
  data() {
    return {
      match_question: undefined,
    };
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      if (!this.match) {
        await this.GET_MATCH({ match_id: localStorage.getItem("match_id") });
      }
      this.match_question = _.get(this.match, "question");
    } catch (err) {
      console.error(err);
    } finally {
      this.SET_LOADING({ data: false });
    }
  },
};
</script>
