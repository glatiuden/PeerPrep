<template>
  <div>
    <h2>Chat with Your Partner</h2>
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
    <vue-webrtc ref="webrtc" width="100%" :room-id="match_id" />

    <v-sheet class="my-4" outlined>
      <div class="message-group">
        <!-- TODO: Need to check whether is receiver/sender and show the style accordingly. -->
        <!-- <div
          class="float-left rounded-lg pa-3 receive white--text"
          style="width: 60%"
        >
          <small><b>Max</b> @ 1:00 PM</small>
          <br />
          <span class="text-body-2">Hello there</span>
        </div> -->

        <div v-for="(message, index) in messages" :key="index" class="mx-2">
          <div class="float-right rounded-lg pa-3 my-2 send" style="width: 60%">
            <small>
              <b>{{ message.username }}</b> @ {{ message.time }}
            </small>
            <br />
            <span class="text-body-2">{{ message.text }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex pa-3 send">
        <v-textarea
          v-model="chat_message"
          class="pt-0"
          rows="1"
          hide-details
          auto-grow
          append-outer-icon="mdi-send"
          @click:append-outer="sendMessage"
          @keyup.enter="sendMessage"
        >
        </v-textarea>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";

export default {
  name: "BaseChat",
  mixins: [systemMixin],
  data() {
    return {
      messages: [],
      chat_message: "",
      match_id: "abc123", // Temporarily hardcoded
      is_video_on: false,
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "chat",
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", this.match_id);
    });

    this.socket.on("message", (data) => {
      console.log("Incoming message: ", data);
      this.messages.push(data);
    });
  },
  methods: {
    sendMessage() {
      const message = {
        username: "Max",
        text: this.chat_message,
        time: this.$moment().format("hh:mm A"),
      };
      this.socket.emit("message", {
        match_id: this.match_id,
        payload: message,
      });
      this.chat_message = "";
    },
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
