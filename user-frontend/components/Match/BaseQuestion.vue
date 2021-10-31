<template>
  <v-card outlined class="white--text mt-3" color="#242424">
    <v-card-title> Question: {{ question.title }} </v-card-title>
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
      <p class="font-weight-bold ma-0">
        <v-icon color="white" class="mr-1">mdi-text-long</v-icon>
        Description:
      </p>
      <div class="ml-8">{{ question.description }}</div>
      <!-- <span>
        <v-icon class="mr-1">mdi-book</v-icon>
        <b>Examples:</b>
      </span>
      <div class="ma-2">
        <div v-for="(example, index) in question.examples" :key="index">
          <code style="display: block">
            <b>Input: </b> {{ example.input }}
            <br />
            <b>Output: </b> {{ example.output }}
          </code>
          <br v-if="index !== question.examples.length - 1" />
        </div>
      </div> -->
      <v-card-actions v-if="question.examples.length > 0">
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
            <template v-if="question.examples.length > 0">
              <div v-for="(example, index) in question.examples" :key="index">
                <code style="display: block">
                  <b>Input: </b> {{ example.input }}
                  <br />
                  <b>Output: </b> {{ example.output }}
                </code>
                <br v-if="index !== question.examples.length - 1" />
              </div>
            </template>
            <p v-else>No examples available!</p>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card-text>
    <!-- <v-card-actions class="pb-3">
      <v-btn color="primary" depressed>Show Hint</v-btn>
    </v-card-actions> -->
  </v-card>
</template>
<script>
import systemMixin from "@/mixins/system";

export default {
  name: "BaseQuestion",
  mixins: [systemMixin],
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
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
