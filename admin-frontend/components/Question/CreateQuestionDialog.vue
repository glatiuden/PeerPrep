<template>
  <v-col>
    <v-card>
      <v-card-title>Create A New Question</v-card-title>
      <v-card-text>
        <v-form v-model="valid_create">
          <v-col>
            <v-row class="gap">
              <v-text-field v-model="new_question.title"
                            label="Title"
                            type="text"
                            outlined
                            dense
                            required
                            hide-details="auto"
                            :rules="required" />
              <v-text-field v-model="new_question.topic"
                            label="Topic"
                            type="text"
                            outlined
                            dense
                            required
                            hide-details="auto"
                            :rules="required" />
              <v-select :items="['easy', 'medium', 'hard']"
                        v-model="new_question.difficulty"
                        label="Difficulty"
                        required />
            </v-row>
            <v-row class="gap">
              <v-textarea v-model="new_question.description"
                          label="Description"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-textarea v-model="new_question.examples"
                          label="Examples"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-textarea v-model="new_question.constraints"
                          label="Constraints"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-textarea v-model="new_question.hints"
                          label="Hints"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-textarea v-model="new_question.solution"
                          label="Solution"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-text-field v-model="new_question.recommended_duration"
                            label="Recommended Duration (mins)"
                            type="number"
                            outlined
                            dense
                            required
                            hide-details="auto"
                            :rules="required" />
            </v-row>
          </v-col>
          <v-btn :disabled="!valid_create" @click="createNewQuestion()">
            Create Question
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>

import questionMixin from "@/mixins/question";

export default {
  name: "CreateQuestionCard",
  mixins: [questionMixin],
  data() {
    return {
      new_question: {
        title: undefined,
        description: undefined,
        topic: undefined,
        difficulty: undefined,
        hints: undefined,
        solution: undefined,
        recommended_duration: undefined,
        examples: undefined,
        constraints: undefined,
      },
      users: [],
      required: [(v) => !!v || "Required"],
      valid_create: false,
      snackbar: {
        show: false,
        message: undefined,
        color: undefined,
      },
    };
    },
  props: {
    question_dialog: {
      default: false
    }
  },
  methods: {
    print(item) {
      console.log(item);
    },
    closeDialog() {
      this.$emit("close");
    },
    showSnackbar(message, color) {
      this.snackbar = {
        show: true,
        message: message,
        color: color,
      };
    },
    async createNewQuestion() {
      try {
        this.SET_LOADING({ data: true });
        console.log(this.new_question);
        await this.CREATE_QUESTION({ question: this.new_question });
        this.closeDialog();
      } catch (err) {
        this.$notification.error("Error creating question", "red");
        console.error(err);
      } finally {
        this.SET_LOADING({ data: false });
        this.$notification.success("Successfully created question", "green");
      }
    },
  },
};
</script>
<style>
.title {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot {
  margin: 10px 0 0 0;
}

.v-sheet.v-card {
  margin: 10px;
}

.role-tag {
  display: flex;
  align-self: center;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 5px;
  height: 20px;
  border-radius: 5px;
  font-size: x-small;
  margin-left: 10px;
}

.margin-0 {
  margin: 0 !important;
}

.gap {
  column-gap: 10px;
  row-gap: 10px;
}
</style>
