<template>
  <v-card v-if="!loading">
    <v-card-title> Match Up </v-card-title>
    <v-divider></v-divider>
    <v-card-subtitle class="py-2">
      This is a match up, where questions are randomly picked according to the
      level of difficulty you have chosen. Upon completion, your partner will
      rate your performance and you will gain ELO points.
    </v-card-subtitle>
    <v-divider></v-divider>
    <v-form v-model="valid">
      <v-card-text>
        <v-row>
          <v-col cols="12" align="center" class="my-2">
            <b>Level of Difficulty</b>
            <br />
            <v-btn-toggle
              v-model="selected_difficulty"
              class="my-1 text-center"
              active-class="primary"
              dense
              mandatory
            >
              <v-btn class="rounded white--text" value="easy" dark>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">Easy</div>
                  </template>
                  Recommended for Beginners
                </v-tooltip>
              </v-btn>
              <v-btn class="rounded ml-1 white--text" value="medium" dark>
                Medium
              </v-btn>
              <v-btn class="rounded ml-1 white--text" value="hard" dark>
                Hard
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" align="center">
            <b>Programming Language</b><br />
            <small
              >To ensure a fair match, we will match users who have chosen the
              same programming language preference. You will not be able to
              change the language after the match starts.</small
            >
            <v-select
              v-model="selected_programming_language"
              outlined
              class="rounded-0"
              dense
              :items="['Java', 'JavaScript', 'C++', 'C', 'Python']"
              persistent-hint
              :rules="select_rules"
              hide-details="auto"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- <small> 1 pair are solving the problem, 2 in queue... </small> -->
        <v-spacer></v-spacer>
        <v-btn color="error" text :loading="loading" @click="closeDialog">
          Close
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          text
          :disabled="!valid"
          @click="startMatch"
        >
          Start Match
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import systemMixin from "@/mixins/system";
import questionMixin from "@/mixins/question";
import matchMixin from "@/mixins/match";
import userMixin from "@/mixins/user";

export default {
  name: "BaseQuestionDialog",
  mixins: [systemMixin, questionMixin, matchMixin, userMixin],
  data() {
    return {
      selected_programming_language: undefined,
      selected_difficulty: undefined,
      valid: false,
      select_rules: [(v) => !!v || "Please select at least one option"],
    };
  },
  methods: {
    async startMatch() {
      console.log("abc");
      try {
        const match = {
          user_id: this.user_id,
          mode: "elo",
          match_requirements: {
            programming_language: this.selected_programming_language,
            difficulty: this.selected_difficulty,
          },
        };
        this.SET_MATCH({ data: match });
        this.closeDialog();
        this.SET_OPEN_MATCHING_DIALOG({ data: true });
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error creating a match: ${err}`);
      }
    },
    closeDialog() {
      this.SET_OPEN_ELO_MATCH_DIALOG({ data: false });
    },
  },
};
</script>
