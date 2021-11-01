<template>
  <v-navigation-drawer
    :permanent="!small_screen && !is_medium_screen"
    right
    app
    clipped
  >
    <template #prepend>
      <h4 class="text-center my-3">Match Chat</h4>
      <BaseVideoChat v-if="!isHistoryMode" :match-id="matchId" />
      <v-divider></v-divider>
    </template>
    <v-sheet>
      <div>
        <section ref="chatArea" class="chat-area">
          <p
            v-for="(message, index) in chat_messages"
            :key="index"
            class="message mb-1"
            :class="{
              'message-out': message.user_id === user._id,
              'message-in': message.user_id !== user._id,
            }"
          >
            <small
              >{{ message.display_name }} @
              {{ $moment(message.time_sent).format("hh:mm A") }}</small
            ><br />
            {{ message.message }}
          </p>
        </section>
      </div>
    </v-sheet>
    <template v-if="!isHistoryMode" #append class="mt-2">
      <div class="d-flex pa-3 send">
        <v-textarea
          v-model="chat_message"
          class="pt-0 white--text"
          rows="1"
          hide-details
          auto-grow
          append-outer-icon="mdi-send"
          color="white"
          @click:append-outer="sendMessage"
          @keyup.enter="sendMessage"
        >
        </v-textarea>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";
import matchMixin from "@/mixins/match";

import BaseVideoChat from "@/components/Match/BaseVideoChat";

export default {
  name: "BaseChat",
  components: { BaseVideoChat },
  mixins: [systemMixin, userMixin, matchMixin],
  props: {
    matchId: {
      type: String,
      required: true,
      default: localStorage.getItem("match_id"),
    },
    isHistoryMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chat_message: undefined,
    };
  },
  async fetch() {
    if (!this.isHistoryMode) {
      return;
    }
    const match_id = this.$route.params.id;
    await this.GET_CHAT({ match_id });
  },
  mounted() {
    if (this.isHistoryMode) {
      return;
    }

    this.socket = this.$nuxtSocket({
      name: "chat",
      persist: "chat",
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", this.matchId);
    });

    this.socket.on("message", (data) => {
      console.log("Incoming message: ", data);
      this.UPDATE_CHAT_MESSAGES({ data });
    });

    this.socket.on("end_session", (match_id) => {
      console.log("Incoming message: ", match_id);
      this.$router.push("/thank-you");
    });
  },
  methods: {
    /**
     * @description Send message
     */
    sendMessage() {
      const message = {
        user_id: this.user._id,
        display_name: this.user.display_name,
        message: this.chat_message,
        time_sent: this.$moment(),
      };

      this.socket.emit("message", {
        match_id: this.matchId,
        payload: message,
      });

      this.chat_message = "";
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
  background-color: #407fff;
}

.chat-area {
  padding-top: 1em;
  background: white;
  overflow: auto;
}

.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  font-size: 0.8em;
  word-wrap: break-word;
}

.message-out {
  background: #407fff;
  color: white;
  margin-left: 50%;
}

.message-in {
  background: #f1f0f0;
  color: black;
  margin-left: 5%;
}

.scrollable {
  overflow: auto;
}
</style>
