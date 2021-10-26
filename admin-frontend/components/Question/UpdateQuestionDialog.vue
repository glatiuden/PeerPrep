<template>
  <v-col>
    <v-card>
      <v-card-title>Edit Question</v-card-title>
      <v-card-text>
        <v-form v-model="valid_create">
          <v-col>
            <v-row class="gap">
              <v-text-field :value="update_question.title"
                            label="Title"
                            type="text"
                            outlined
                            dense
                            required
                            hide-details="auto"
                            :rules="required" />
              <v-select :value="update_question.topic"
                        :items="['Data Structures', 'Algorithms', 'Database']"
                        label="Topic"
                        outlined
                        dense
                        required
                        hide-details="auto" />
              <v-select :value="update_question.difficulty"
                        :items="['easy', 'medium', 'hard']"
                        label="Difficulty"
                        required
                        outlined
                        dense
                        hide-details="auto" />
            </v-row>
            <v-row class="gap">
              <v-textarea :value="update_question.description"
                          label="Description"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-col cols="12">
                <div class="d-flex">
                  <h3 class="my-auto">Examples</h3>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="addNewRow('examples')">
                    <v-icon left>mdi-plus</v-icon>
                    Add
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            <v-row v-for="(example, index) in update_question.examples"
                   :key="`example-${index}`"
                   class="my-0 py-0">
              <v-col cols="8">
                <v-text-field :value="example.input"
                              label="Input"
                              outlined
                              hide-details></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field :value="example.output"
                              label="Output"
                              outlined
                              hide-details></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn icon
                       color="red"
                       class="my-2"
                       @click="removeRow('examples', index)">
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="gap">
              <v-col cols="12">
                <div class="d-flex">
                  <h3 class="my-auto">Constraints</h3>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="addNewRow('constraints')">
                    <v-icon left>mdi-plus</v-icon>
                    Add
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row v-for="(constraint, index) in update_question.constraints"
                   :key="`constraint-${index}`"
                   class="my-0 py-0">
              <v-col cols="11">
                <v-text-field :value="update_question.constraints[index]"
                              label="Example"
                              outlined
                              hide-details></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn icon
                       color="red"
                       class="my-2"
                       @click="removeRow('constraints', index)">
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="gap">
              <v-col cols="12">
                <div class="d-flex">
                  <h3 class="my-auto">Hints</h3>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="addNewRow('hints')">
                    <v-icon left>mdi-plus</v-icon>
                    Add
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row v-for="(hint, index) in update_question.hints"
                   :key="`hint-${index}`"
                   class="my-0 py-0">
              <v-col cols="11">
                <v-text-field :value="update_question.hints[index]"
                              label="Hint"
                              outlined
                              hide-details></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn icon
                       color="red"
                       class="my-2"
                       @click="removeRow('hints', index)">
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row class="gap">
              <v-textarea :value="update_question.solution"
                          label="Solution"
                          type="text"
                          outlined
                          dense
                          required
                          hide-details="auto"
                          :rules="required" />
            </v-row>
            <v-row class="gap">
              <v-text-field :value="update_question.recommended_duration"
                            label="Recommended Duration (mins)"
                            type="number"
                            outlined
                            dense
                            required
                            hide-details="auto"
                            :rules="required" />
            </v-row>
          </v-col>
          <v-btn :disabled="!valid_create" @click="updateNewQuestion()">
            Update Question
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  import questionMixin from "@/mixins/question";

  export default {
    name: "updateQuestionDialog",
    mixins: [questionMixin],
    /**
    props: {
      update_question: {
        _id: undefined,
        title: undefined,
        description: undefined,
        topic: undefined,
        difficulty: undefined,
        hints: [""],
        solution: undefined,
        recommended_duration: undefined,
        examples: [{ input: "", output: "" }],
        constraints: [""],
      },
    },
    */
    data() {
      return {
          update_question: {
          _id: undefined,
          title: undefined,
          description: undefined,
          topic: undefined,
          difficulty: undefined,
          hints: [""],
          solution: undefined,
          recommended_duration: undefined,
          examples: [{ input: "", output: "" }],
          constraints: [""],
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
    /**
    async fetch() {
      this.fetchQuestion();
    },
     */
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
      /**async fetchQuestion() {
        try {
          this.SET_LOADING({ data: true });
          const questionToBeUpdated = await this.GET_QUESTION({ question_id });
          (update_question) => ({
            ...update_question,
            _id: update_question._id,
            title: update_question.title,
            description: update_question.description,
            topic: update_question.topic,
            difficulty: update_question.difficulty,
            hints: update_question.hints,
            solution: update_question.solution,
            recommended_duration: update_question.recommended_duration,
            examples: update_question.examples,
            constraints: update_question.constraints,
          });
        } catch (err) {
          console.error(err);
        } finally {
          this.SET_LOADING({ data: false });
        }
      },
      */
      async updateNewQuestion() {
        try {
          this.SET_LOADING({ data: true });
          console.log(this.update_question);
          await this.UPDATE_QUESTION({ question: this.update_question });
          this.closeDialog();
        } catch (err) {
          this.$notification.error("Error updating question");
          console.error(err);
        } finally {
          this.SET_LOADING({ data: false });
          this.$notification.success("Successfully updated question");
        }
      },
      addNewRow(row_name) {
        let data = "";
        if (row_name === "examples") {
          data = {
            input: "",
            output: "",
          };
        }
        this.update_question[row_name].push(data);
      },
      removeRow(row_name, index) {
        this.update_question[row_name] = this.update_question[row_name].splice(
          index,
          1,
        );
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
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot {
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
