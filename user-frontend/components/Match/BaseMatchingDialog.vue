<template>
  <v-card v-if="!loading">
    <v-divider></v-divider>
    <v-card-text class="my-3 text-center">
      <Lottie
        class="my-auto"
        :options="defaultOptions"
        :width="is_mobile ? 200 : 300"
        :height="200"
      />
      <h2 class="my-3 loading">Looking for a match</h2>
      <v-countdown :end-time="new Date().getTime() + 30000">
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
import animationData from "@/assets/searching-lottie.json";

import matchMixin from "@/mixins/match";
import systemMixin from "@/mixins/system";

export default {
  name: "BaseQuestionDialog",
  mixins: [matchMixin, systemMixin],
  data() {
    return {
      defaultOptions: { animationData, loop: true },
      socketStatus: {},
      match_id: undefined,
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "match",
      reconnection: true,
      statusProp: "socketStatus",
    });

    this.socket.on("connect", () => {
      this.$notification.success(
        `Successfully created a match! We will notify and start the session once there is a match!`,
      );
      this.socket.emit("matching", this.match);
    });

    this.socket.on("waiting", (data) => {
      if (!!data) {
        this.match_id = data;
      }
    });

    this.socket.on("matched", (data) => {
      if (!!data) {
        const match_id = _.get(data, "_id");
        console.log(data);
        this.SET_MATCH({ data });
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
