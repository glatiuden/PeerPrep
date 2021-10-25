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
    <!--<div v-for="(user, index) in users" :key="index">
    <v-card>
      <v-card-title class="title">
        <v-row class="margin-0">
          {{ user.display_name }}
          <div :class="'role-tag ' + user.role.toLowerCase()">
            {{ user.role.toUpperCase() }}
          </div>
        </v-row>
        <div>
          <v-btn outlined color="primary" @click="toggleEditing(user)">
            <v-icon small class="mr-1">mdi-account-remove</v-icon>
            {{ user.editing ? "Cancel" : "Edit User" }}
          </v-btn>
          <v-btn color="primary" @click="deleteUser(user)">
            <v-icon small class="mr-1">mdi-account-remove</v-icon>
            Remove User
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text v-if="!user.editing">
        {{ user.email }}
      </v-card-text>
      <v-card-text v-if="user.editing">
        <v-form>
          <v-col cols="12" sm="9" md="9" lg="9" xl="8">
            <v-text-field
              v-model="user.email"
              label="Email Address"
              name="email"
              prepend-inner-icon="mdi-email-outline"
              type="email"
              outlined
              dense
              required
              hide-details="auto"
              :rules="email_rules"
            />
            <v-text-field
              label="Password"
              name="password"
              prepend-inner-icon="mdi-lock-outline"
              type="text"
              outlined
              dense
              required
              hide-details="true"
              :rules="required"
            />
          </v-col>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
    <v-btn @click="showSnackbar('hello', 'red')">snackbar</v-btn>
    <v-snackbar :color="snackbar.color" v-model="snackbar.show">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text @click="snackbar.show = false" v-bind="attrs">
          Close
        </v-btn>
      </template>
    </v-snackbar>-->
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
        this.$notification.error("Error creating user", "red");
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
