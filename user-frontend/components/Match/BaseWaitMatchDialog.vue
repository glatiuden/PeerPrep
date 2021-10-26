<template>
  <v-card v-if="!loading">
    <v-divider></v-divider>
    <v-card-text class="my-3 text-center">
      <div v-if="is_timer_ended">
        <Lottie
          class="my-auto"
          :options="not_found_options"
          :width="is_mobile ? 200 : 300"
          :height="200"
        />
        <h2>😔 No match found</h2>
      </div>
      <div v-else>
        <Lottie
          class="my-auto"
          :options="searching_options"
          :width="is_mobile ? 200 : 300"
          :height="200"
        />
        <h2 class="my-3 loading">Looking for a match</h2>
      </div>
      <v-countdown
        :end-time="new Date().getTime() + 30000"
        @finish="timerEnded"
      >
        <h1 slot="process" slot-scope="{ timeObj }">{{ `${timeObj.s}` }}s</h1>
        <p slot="finish">No match found! Do you want to try again?</p>
      </v-countdown>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" :loading="loading" text @click="closeDialog">
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import searchingLottie from "@/assets/searching-lottie.json";
import notFoundLottie from "@/assets/not-found.json";

import matchMixin from "@/mixins/match";
import systemMixin from "@/mixins/system";

export default {
  name: "BaseQuestionDialog",
  mixins: [matchMixin, systemMixin],
  data() {
    return {
      searching_options: { animationData: searchingLottie, loop: true },
      not_found_options: { animationData: notFoundLottie, loop: true },
      match_id: undefined,
      is_timer_ended: false,
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "match",
      reconnection: true,
    });

    const match_mode = _.get(this.match, "mode", "question");

    this.socket.on("connect", () => {
      this.$notification.success(
        `Successfully created a match! We will notify and start the session once there is a match!`,
      );
      this.socket.emit(`${match_mode}_matching`, this.match);
    });

    this.socket.on("waiting", (data) => {
      if (!!data) {
        this.match_id = data;
      }
    });

    this.socket.on("matched", (data) => {
      if (!!data) {
        const match_id = _.get(data, "_id");
        this.SET_MATCH({ data });
        this.SET_OPEN_MATCHING_DIALOG({ data: false });
        localStorage.setItem("match_id", match_id);
        this.$router.push(`/match/${match_id}`);
      }
    });
  },
  methods: {
    closeDialog() {
      this.socket.emit("cancel", this.match_id);
      this.SET_OPEN_MATCHING_DIALOG({ data: false });
    },

    timerEnded() {
      this.is_timer_ended = true;
    },
  },
};
</script>
<style>
.loading::after {
  display: inline-block;
  animation: dotty steps(1, end) 5s infinite;
  content: "";
}

@keyframes dotty {
  0% {
    content: "";
  }
  25% {
    content: ".";
  }
  50% {
    content: "..";
  }
  75% {
    content: "...";
  }
  100% {
    content: "";
  }
}
</style>
