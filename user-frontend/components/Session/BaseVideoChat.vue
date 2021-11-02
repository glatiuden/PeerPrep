<template>
  <div>
    <v-btn color="primary" block depressed @click="clickVideoChat">
      {{ `${is_video_on ? "Stop" : "Start"} Video Chat` }}
    </v-btn>
    <vue-webrtc
      v-show="is_video_on"
      ref="webrtc"
      class="py-2"
      width="100%"
      :room-id="matchId"
    />
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";
import matchMixin from "@/mixins/match";

export default {
  name: "BaseVideoChat",
  mixins: [systemMixin, matchMixin],
  props: {
    matchId: {
      type: String,
      required: true,
      default: localStorage.getItem("match_id"),
    },
  },
  destroyed() {
    if (this.$refs.webrtc) {
      this.$refs.webrtc.leave();
    }
  },
  methods: {
    clickVideoChat() {
      this.SET_IS_VIDEO_ON({ data: !this.is_video_on });
      if (this.is_video_on) {
        this.$refs.webrtc.join();
      } else {
        this.$refs.webrtc.leave();
      }
    },
  },
};
</script>
