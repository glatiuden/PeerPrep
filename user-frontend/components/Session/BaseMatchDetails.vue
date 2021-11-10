<template>
  <v-card outlined class="mt-3 white--text" color="#242424">
    <v-card-title> Match Details</v-card-title>
    <v-card-text class="white--text">
      <v-icon color="white" class="mr-1">mdi-shield-sword-outline</v-icon>
      Match Mode:
      <v-chip small :color="mode_chip_colors[match.mode]" text-color="white">
        {{ match.mode }}
      </v-chip>
      <br />
      <v-countdown
        v-if="should_show_timer"
        :left-time="time_left"
        @finish="$emit('end-match')"
      >
        <template #process="{ timeObj }">
          <v-icon color="white" class="mr-1">mdi-timer</v-icon>
          Time Left: <b>{{ `${timeObj.m}:${timeObj.s}` }}</b>
          <br />
        </template>
      </v-countdown>
      <span v-else-if="!is_otot_mode">
        <v-icon color="white" class="mr-1">mdi-timer</v-icon> Time Taken:
        <b>{{ time_taken }} min</b>
      </span>
      <span v-else-if="match.status === 'in-progress'">
        <v-icon color="white" class="mr-1">mdi-timer</v-icon> This session is
        valid for 12 hours
      </span>
      <v-divider class="my-6 white"></v-divider>
      <v-icon color="white" class="mr-1">mdi-account</v-icon>
      Partner's Display Name: <b>{{ partner_info.display_name }}</b>
      <br />
      <v-icon color="white" class="mr-1">mdi-code-tags</v-icon>
      Programming Language:
      <b class="text-capitalize">{{
        match.match_requirements.programming_language
      }}</b>
    </v-card-text>
    <v-card-actions class="pb-6 mx-2">
      <v-btn
        v-if="!isHistoryMode"
        color="error"
        block
        depressed
        @click="endMatch"
      >
        End Match
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";

export default {
  name: "BaseMatchDetails",
  mixins: [systemMixin, userMixin],
  props: {
    isHistoryMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      match: "match/match",
    }),
    /**
     * @description Get partner's information based on id
     */
    partner_info() {
      const partner1_id = _.get(this.match, "partner1._id");
      if (partner1_id === this.user_id) {
        return this.match.partner1;
      }
      return this.match.partner2;
    },
    /**
     * @description Computes the exact duration left
     */
    time_left() {
      const updated_at = _.get(this.match, "matched_at");
      const recommended_duration = _.get(
        this.match,
        "question.recommended_duration",
      );
      const end_time = this.$moment(updated_at).add(
        recommended_duration,
        "minutes",
      );

      const time_left = end_time.diff(this.$moment(), "milliseconds");
      return time_left;
    },
    /**
     * @description Computes the exact duration left
     */
    time_taken() {
      const matched_at = _.get(this.match, "matched_at");
      const completed_at = _.get(this.match, "completed_at");
      const time_taken = this.$moment(completed_at).diff(matched_at, "minutes");
      return time_taken;
    },

    /**
     * @description Check whether should the timer be shown
     */
    should_show_timer() {
      const is_timed =
        _.get(this.match, "match_requirements.question_mode") === "timed";
      return is_timed && !this.isHistoryMode;
    },

    /**
     * @description Check whether is otot mode
     */
    is_otot_mode() {
      const is_otot =
        _.get(this.match, "match_requirements.question_mode") === "otot";
      return is_otot;
    },
  },
  methods: {
    endMatch() {
      if (this.time_left > 0) {
        const answer = confirm("Are you sure you want to end the match?");
        if (answer) {
          this.$emit("end-match");
        } else {
          next(false);
        }
      }
    },
  },
};
</script>
