<template>
  <div>
    <v-btn
      v-if="!is_video_on"
      color="primary"
      block
      depressed
      @click="clickVideoChat"
    >
      Start Video Chat
    </v-btn>
    <v-btn v-else color="primary" block depressed @click="clickVideoChat">
      Stop Video Chat
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

export default {
  name: "BaseVideoChat",
  mixins: [systemMixin],
  props: {
    matchId: {
      type: String,
      required: true,
      default: localStorage.getItem("match_id"),
    },
  },
  data() {
    return {
      is_video_on: false,
    };
  },
  methods: {
    clickVideoChat() {
      this.is_video_on = !this.is_video_on;
      if (this.is_video_on) {
        this.$refs.webrtc.join();
      } else {
        this.$refs.webrtc.leave();
      }
    },
  },
};
</script>

<style>
.message-group {
  height: 58vh !important;
  overflow-y: auto;
  margin-bottom: 10px;
}

.receive {
  background-color: #182533;
}

.send {
  background-color: #78acdb;
}
</style>
