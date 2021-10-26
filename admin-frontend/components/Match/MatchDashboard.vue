<template>
  <v-card>
    <v-card-title> {{ type }} </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="valid">
      <v-card-text>
        <v-container>
          <!-- <v-text-field
            v-model="new_match.match_id"
            :counter="255"
            :rules="match_id_rules"
            label="Match ID"
            hint="The match ID of this match record"
            required
            outlined
            dense
          /> -->

          <!-- <v-text-field
            v-model="new_match.programming_language"
            :counter="360"
            :rules="programming_language_rules"
            label="Programming Language"
            hint="Programming language of the match"
            required
            outlined
            dense
          ></v-text-field> -->

          <v-textarea
            v-model="new_match.status"
            :counter="255"
            :rules="status_rules"
            label="Status"
            hint="Status of the match"
            required
            outlined
            dense
          ></v-textarea>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text :loading="loading" @click="closeDialog"
          >Cancel
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          text
          :disabled="!valid"
          @click="
            clickSave();
            $emit('close-dialog');
          "
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import matchMixin from "@/mixins/match";

export default {
  name: "BaseMatchDialog",
  mixins: [matchMixin],
  data() {
    return {
      type: "Add Match",
      valid: false,
      new_match: {
        match_id: "",
        programming_language: "",
        status: "",
      },
      default_match: {
        match_id: "",
        programming_language: "",
        status: "",
      },
      // match_id_rules: [
      //   (v) => !!v || "Match ID is required",
      //   (v) =>
      //     (v && v.length <= 255) || "Match ID must be less than 255 characters",
      // ],
      // programming_language_rules: [
      //   (v) => !!v || "Programming Language is required",
      //   (v) =>
      //     (v && v.length <= 255) ||
      //     "Programming Language must be less than 255 characters",
      // ],
      status_rules: [
        (v) => !!v || "Status is required",
        (v) =>
          (v && v.length <= 255) ||
          "Status must be less than 255 characters",
      ],
    };
  },
  computed: {
    is_edit() {
      return this.match && this.match_id;
    },
  },
  mounted() {
    this.resetMatch();
  },
  mounted() {
    if (this.is_edit) {
      this.type = `Edit Match ${this.match_id}`;
      this.new_match = _.cloneDeep(this.match);
    }
  },
  methods: {
    async clickSave() {
      if (this.is_edit) {
        await this.updateMatch();
      } else {
        await this.addMatch();
      }
    },
    // /**
    //  * @description: add a new match to server + store
    //  */
    // async addMatch() {
    //   try {
    //     this.SET_LOADING({ data: true });
    //     await this.CREATE_MATCH({
    //       match: this.new_match,
    //     });
    //     await this.GET_MATCHES_PAGINATED();
    //     this.$notification.success(`Match has been created successfully.`);
    //     this.$emit("close-dialog");
    //   } catch (err) {
    //     console.error(err);
    //     this.$notification.error(`Encountered error adding match: ${err}.`);
    //   } finally {
    //     this.closeDialog();
    //   }
    // },
    /**
     * @description: update match to server + store
     */
    async updateMatch() {
      try {
        this.SET_LOADING({ data: true });
        await this.UPDATE_MATCH({
          match: {
            ...this.new_match,
            id: this.match_id,
            status: this.match_status
          },
        });
        await this.GET_MATCHES_PAGINATED();
        this.$notification.success(`Match has been updated successfully.`);
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error updating match: ${err}.`);
      } finally {
        this.closeDialog();
      }
    },
    /**
     * @description reset match object when mounted again
     */
    resetMatch() {
      this.new_match = this.default_match;
    },
    /**
     * @description reset match object when mounted again
     */
    closeDialog() {
      this.SET_LOADING({ data: false });
      this.resetMatch();
      this.SET_MATCH_ID({ data: null });
      this.$emit("close-dialog");
    },
  },
};
</script>
