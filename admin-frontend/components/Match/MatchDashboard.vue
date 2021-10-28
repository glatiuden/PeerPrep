<template>
  <v-card>
    <v-card-title> Edit Match {{ match._id }} </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="valid">
      <v-card-text>
        <v-container>
          <v-text-field
            v-model="new_match.status"
            :rules="status_rules"
            label="Status"
            hint="Status of the match"
            required
            outlined
            dense
          ></v-text-field>
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
            updateMatch();
            $emit('close');
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
      status_rules: [
        (v) => !!v || "Status is required",
        (v) =>
          (v && v.length <= 255) || "Status must be less than 255 characters",
      ],
    };
  },
  mounted() {
    if (this.match) {
      this.new_match = _.cloneDeep(this.match);
    }
  },
  methods: {
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
      this.$emit("close");
    },
  },
};
</script>
