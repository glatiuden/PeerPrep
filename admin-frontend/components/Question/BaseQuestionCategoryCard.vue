<template>
  <v-card class="rounded-lg fill-height card-background d-flex flex-column">
    <v-card-title class="white--text text-h5 font-weight-bold">
      {{ topic }}
    </v-card-title>
    <v-card-subtitle class="white--text">
      Challenge yourself to {{ topic }} questions!
    </v-card-subtitle>

    <v-spacer></v-spacer>
    <br />

    <v-card-text class="white">
      <v-row class="text-center">
        <v-col cols="4">
          <h3>6</h3>
          questions
        </v-col>
        <v-col cols="4">
          <h3>10</h3>
          attempts
        </v-col>
        <v-col cols="4" class="my-auto">
          <v-btn depressed text class="mx-0 px-0">
            Start
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import questionMixin from "@/mixins/question";

export default {
  name: "BaseQuestionCategoryCard",
  mixins: [questionMixin],
  props: {
    topic: {
      type: String,
      required: true,
    },
  },
};
</script>
<style>
.card-background {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}
</style>
