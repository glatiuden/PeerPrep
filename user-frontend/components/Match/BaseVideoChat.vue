<template>
  <div>
    <v-btn
      v-if="!is_video_on"
      color="primary"
      block
      depressed
      @click="clickVideoChat({ join: true })"
    >
      Start Video Chat
    </v-btn>
    <v-btn
      v-else
      color="primary"
      block
      depressed
      @click="clickVideoChat({ join: false })"
    >
      Stop Video Chat
    </v-btn>
    <vue-webrtc ref="webrtc" class="my-2" width="100%" :room-id="match_id" />
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";

export default {
  name: "BaseVideoChat",
  mixins: [systemMixin],
  data() {
    return {
      match_id: localStorage.getItem("match_id"),
      is_video_on: false,
    };
  },
  methods: {
    clickVideoChat({ join }) {
      if (join) {
        this.$refs.webrtc.join();
      } else {
        this.$refs.webrtc.leave();
      }
      this.is_video_on = join;
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
