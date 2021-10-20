<template>
  <v-card v-if="!loading">
    <v-card-title> {{ question.title }} </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="my-3">
      <v-row>
        <v-col cols="7">
          <p>
            <v-icon small class="mr-1">mdi-pencil</v-icon>
            <b>Difficulty:</b>
            <v-chip small>{{ question.difficulty }}</v-chip>
          </p>
          <p>
            <v-icon small class="mr-1">mdi-pencil</v-icon>
            <b>Topic:</b>
            <v-chip small>{{ question.topic }}</v-chip>
          </p>
          <p class="font-weight-bold ma-0">
            <v-icon small class="mr-1">mdi-pencil</v-icon>
            Description:
          </p>
          <div class="ml-6">{{ question.description }}</div>
        </v-col>
        <v-col>
          <p class="font-weight-bold">Sample:</p>
          <code> fuck u </code>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <small> 1 pair are solving the problem, 2 in queue... </small>
      <v-spacer></v-spacer>
      <v-btn color="error" text :loading="loading" @click="closeDialog">
        Close
      </v-btn>
      <v-btn color="primary" :loading="loading" text> Start Match </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import questionMixin from "@/mixins/question";

export default {
  name: "BaseQuestionDialog",
  mixins: [questionMixin],
  methods: {
    startMatch() {
      // start match
    },
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
