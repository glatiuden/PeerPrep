<template>
  <v-card
    :class="`rounded-lg fill-height card-background-${index} d-flex flex-column`"
  >
    <v-card-title class="white--text text-h5 font-weight-bold">
      {{ topic_name }}
    </v-card-title>
    <v-card-subtitle class="white--text">
      {{ topic_description }}
    </v-card-subtitle>

    <v-spacer></v-spacer>
    <br />

    <v-card-text class="white">
      <v-row class="text-center">
        <v-col cols="4">
          <h3>{{ topic.count }}</h3>
          questions
        </v-col>
        <v-col cols="4">
          <h3>{{ topic.number_of_attempts || 0 }}</h3>
          attempts
        </v-col>
        <v-col cols="4" class="my-auto">
          <v-btn depressed text class="mx-0 px-0" @click="clickFilter">
            Explore
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
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    topic_name() {
      return _.get(this.topic, "_id");
    },
    topic_description() {
      return (
        this.question_descriptions[this.topic._id] ||
        `  Challenge yourself to ${this.topic._id} questions!`
      );
    },
  },
  methods: {
    clickFilter() {
      this.SET_SELECTED_TOPICS({
        data: _.uniq([...this.selected_topics, this.topic._id]),
      });
      this.$emit("perform-filter");
    },
  },
};
</script>
<style>
.card-background-0 {
  background: rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
}

.card-background-1 {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
}

.card-background-2 {
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
}
</style>
