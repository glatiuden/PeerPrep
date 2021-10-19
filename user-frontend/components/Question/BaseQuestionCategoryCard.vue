<template>
  <v-card outlined>
    <v-card-title> Introduction to Data Structure </v-card-title>
    <v-card-text>
      Challenge yourself to data structures questions!
    </v-card-text>
    <v-card-text class="d-flex text-center">
      <div>
        <h3>6</h3>
        questions
      </div>
      <v-spacer></v-spacer>
      <div>
        <h3>10</h3>
        attempts
      </div>
      <v-spacer></v-spacer>
      <v-btn large depressed
        >Start <br />
        now
      </v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import questionMixin from "@/mixins/question";

export default {
  name: "BaseQuestionCategoryCard",
  components: {},
  mixins: [questionMixin],
};
</script>
