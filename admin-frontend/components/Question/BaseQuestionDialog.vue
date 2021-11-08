<template>
  <v-card v-if="!loading">
    <v-card-title> {{ question.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="my-3">
      <v-row>
        <v-col cols="7">
          <p>
            <v-icon class="mr-1">mdi-code-tags</v-icon>
            <b>Difficulty:</b>
            <v-chip
              small
              :color="chip_colors[question.difficulty]"
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
          <p class="font-weight-bold">Examples:</p>
          <template v-if="question.examples.length > 0">
            <div v-for="(example, index) in question.examples" :key="index">
              <code style="display: block">
                <b>Input: </b> {{ example.input }}
                <br />
                <b>Output: </b> {{ example.output }}
              </code>
              <br />
            </div>
          </template>
          <p v-else>No examples available!</p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <!-- <small> 1 pair are solving the problem, 2 in queue... </small> -->
      <v-spacer></v-spacer>
      <v-btn color="error" text :loading="loading" @click="deleteQuestion">
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import questionMixin from "@/mixins/question";

export default {
  name: "BaseQuestionDialog",
  mixins: [questionMixin],
  data() {
    return {
      selected_programming_language: undefined,
      selected_mode: "timed",
      valid: false,
      select_rules: [(v) => !!v || "Please select at least one option"],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    async deleteQuestion() {
      const is_confirmed = confirm(
        "Are you sure you want to delete this question? It is an irreversible action.",
      );

      if (!is_confirmed) {
        return;
      }

      try {
        const question_id = this.question._id;
        await this.DELETE_QUESTION({ question_id });
        this.$notification.success(`Successfully deleted!`);
        await this.GET_QUESTIONS_PAGINATED();
        this.closeDialog();
        this.GET_QUESTION();
      } catch (err) {
        console.error(err);
        this.$notification.error(
          `Encountered error deleting this question: ${err}`,
        );
      }
    },
  },
};
</script>
