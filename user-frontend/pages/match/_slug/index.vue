<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <v-row v-else class="mx-auto my-4">
    <v-col cols="6">
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
              :color="chip_colors[match_question.difficulty]"
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
        <v-card-text>
          <v-card-actions>
            <v-btn text @click="show = !show"
              >{{ show ? "Hide" : "Show" }} Examples</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>
                {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
              </v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>
                <template v-if="match_question.examples.length > 0">
                  <div
                    v-for="(example, index) in match_question.examples"
                    :key="index"
                  >
                    <code style="display: block">
                      <b>Input: </b> {{ example.input }}
                      <br />
                      <b>Output: </b> {{ example.output }}
                    </code>
                    <br />
                  </div>
                </template>
                <p v-else>No examples available!</p>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card-text>
        <!-- <v-card-actions class="pb-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed>Hint</v-btn>
        </v-card-actions> -->
      </v-card>
      <BaseChat />
    </v-col>
    <v-col cols="12" lg="6">
      <BaseVideoChat />
      <BaseCodeEditor />
    </v-col>
  </v-row>
</template>
<script>
import questionMixin from "@/mixins/question";
import editorMixin from "@/mixins/editor";
import matchMixin from "@/mixins/match";

import BaseChat from "@/components/Editor/BaseChat";
import BaseCodeEditor from "@/components/Editor/BaseCodeEditor";
import BaseVideoChat from "@/components/Editor/BaseVideoChat";

export default {
  components: {
    BaseChat,
    BaseCodeEditor,
    BaseVideoChat,
  },
  mixins: [editorMixin, matchMixin, questionMixin],
  data() {
    return {
      match_question: undefined,
      show: false,
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
