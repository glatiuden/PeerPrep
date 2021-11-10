<template>
  <v-card outlined class="white--text mt-3" color="#242424">
    <v-card-title class="break-word">
      Question: {{ question.title }}
    </v-card-title>
    <v-card-text class="white--text">
      <p>
        <v-icon color="white" class="mr-1">mdi-code-tags</v-icon>
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
        <v-icon color="white" class="mr-1">mdi-book</v-icon>
        <b>Topic:</b>
        <v-chip small color="primary">{{ question.topic }}</v-chip>
      </p>
      <p class="font-weight-bold ma-0 break-word">
        <v-icon color="white" class="mr-1">mdi-text-long</v-icon>
        Description:
      </p>
      <div class="ml-8">{{ question.description }}</div>

      <!-- Examples -->
      <v-card-actions v-if="question_examples.length > 0" class="pb-0">
        <v-btn text color="white" @click="show_examples = !show_examples"
          >{{ show_examples ? "Hide" : "Show" }} Examples</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="show_examples = !show_examples">
          <v-icon color="white">
            {{ show_examples ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show_examples">
          <v-card-text class="py-1">
            <div v-for="(example, index) in question_examples" :key="index">
              <code class="example">
                <b>Input: </b> {{ example.input }}
                <br />
                <b>Output: </b> {{ example.output }}
              </code>
              <br v-if="index !== question_examples.length - 1" />
            </div>
          </v-card-text>
        </div>
      </v-expand-transition>

      <!-- Constraints -->
      <v-card-actions v-if="question_constraints.length > 0">
        <v-btn text color="white" @click="show_constraints = !show_constraints"
          >{{ show_constraints ? "Hide" : "Show" }} Constraints</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="show_constraints = !show_constraints">
          <v-icon color="white">
            {{ show_constraints ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show_constraints">
          <v-card-text class="py-1">
            <code class="example">
              <ul>
                <li
                  v-for="(constraint, index) in question_constraints"
                  :key="index"
                >
                  {{ constraint }}
                </li>
              </ul>
            </code>
          </v-card-text>
        </div>
      </v-expand-transition>

      <!-- Hints -->
      <v-card-actions v-if="question_hints.length > 0" class="py-0">
        <v-btn text color="white" @click="show_hints = !show_hints"
          >{{ show_hints ? "Hide" : "Show" }} Hints</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn icon @click="show_hints = !show_hints">
          <v-icon color="white">
            {{ show_hints ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show_hints">
          <v-card-text class="py-1">
            <div v-for="(hint, index) in question_hints" :key="index">
              <p>{{ hint }}</p>
            </div>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card-text>
  </v-card>
</template>
<script>
import _ from "lodash";
import systemMixin from "@/mixins/system";

export default {
  name: "BaseQuestionDetails",
  mixins: [systemMixin],
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show_examples: false,
      show_hints: false,
      show_constraints: false,
    };
  },
  computed: {
    question_examples() {
      const examples = _.get(this.question, "examples", []);
      return _.compact(examples);
    },
    question_hints() {
      const hints = _.get(this.question, "hints", []);
      return _.compact(hints);
    },
    question_constraints() {
      const constraints = _.get(this.question, "constraints", []);
      return _.compact(constraints);
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
        this.$notification.error(`Encountered error fetching match: ${err}`);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },
  },
};
</script>
