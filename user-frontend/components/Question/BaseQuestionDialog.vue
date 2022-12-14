<template>
  <div v-if="loading" class="loading-skeleton">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
  <v-card v-else>
    <v-card-title>Question: {{ question.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="my-3">
      <v-row>
        <v-col cols="7">
          <p>
            <v-icon class="mr-1">mdi-code-tags</v-icon>
            <b>Difficulty:</b>
            <v-chip
              small
              :color="difficulty_chip_colors[question.difficulty]"
              text-color="white"
            >
              {{ question.difficulty }}
            </v-chip>
          </p>
          <p>
            <v-icon class="mr-1">mdi-book</v-icon>
            <b>Topic:</b>
            <v-chip small color="primary">{{ question.topic }}</v-chip>
          </p>
          <p class="font-weight-bold ma-0">
            <v-icon class="mr-1">mdi-text-long</v-icon>
            Description:
          </p>
          <div class="ml-8">{{ question.description }}</div>
        </v-col>
        <v-col>
          <template v-if="question_examples.length > 0">
            <p class="font-weight-bold">Examples:</p>
            <div v-for="(example, index) in question_examples" :key="index">
              <code class="code-block">
                <b>Input: </b> {{ example.input }}
                <br />
                <b>Output: </b> {{ example.output }}
              </code>
              <br />
            </div>
          </template>
          <p v-else>No examples available!</p>

          <template v-if="question_constraints.length > 0">
            <p class="font-weight-bold">Constraints:</p>
            <code class="code-block">
              <ul>
                <li
                  v-for="(constraint, index) in question_constraints"
                  :key="index"
                >
                  {{ constraint }}
                </li>
              </ul>
            </code>
          </template>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text class="my-3">
      <v-form v-model="valid">
        <div class="my-3">
          <h3>Practice Mode Match</h3>
          <p class="text-caption">
            Please select the following options so we can best match you to a
            suitable partner!
          </p>
        </div>
        <v-row>
          <v-col cols="12" md="6">
            <div class="mx-1">Preferred Programming Language</div>
            <v-select
              v-model="selected_programming_language"
              outlined
              class="rounded-0"
              dense
              :items="programming_languages"
              hint="Please choose a language that you wish to work on. You will not be able to change after the match starts."
              persistent-hint
              :rules="select_rules"
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <div class="mx-1">Preferred Mode</div>
            <v-btn-toggle
              v-model="selected_mode"
              class="my-1"
              active-class="primary"
              dense
              mandatory
            >
              <v-btn class="rounded ml-1 white--text" value="timed" dark>
                Timed Mode ({{ question.recommended_duration || 0 }} min)
              </v-btn>
              <v-btn class="rounded ml-1 white--text" value="otot" dark>
                OTOT Mode
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" text :loading="loading" @click="closeDialog">
        Close
      </v-btn>
      <v-btn
        color="primary"
        :loading="loading"
        text
        :disabled="!valid"
        @click="startMatch"
      >
        Start Match
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import systemMixin from "@/mixins/system";
import questionMixin from "@/mixins/question";
import matchMixin from "@/mixins/match";
import userMixin from "@/mixins/user";

export default {
  name: "BaseQuestionDialog",
  mixins: [systemMixin, questionMixin, matchMixin, userMixin],
  data() {
    return {
      selected_programming_language: undefined,
      selected_mode: "timed",
      valid: false,
      select_rules: [(v) => !!v || "Please select at least one option"],
    };
  },
  computed: {
    question_examples() {
      const examples = _.get(this.question, "examples", []);
      return _.compact(examples);
    },
    question_constraints() {
      const constraints = _.get(this.question, "constraints", []);
      return _.compact(constraints);
    },
  },
  methods: {
    async startMatch() {
      try {
        const match = {
          user_id: this.user_id,
          question_id: this.question._id,
          mode: "question",
          match_requirements: {
            programming_language: this.selected_programming_language,
            question_mode: this.selected_mode,
          },
        };
        this.SET_MATCH({ data: match });
        this.closeDialog();
        this.SET_OPEN_MATCHING_DIALOG({ data: true });
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error creating a match: ${err}`);
      }
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
