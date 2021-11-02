<template>
  <div>
    <BaseVideoChat v-if="!isHistoryMode" :match-id="matchId" />
    <v-divider></v-divider>
    <v-sheet
      class="fill-height"
      style="overflow: auto"
      :height="chat_div_height()"
    >
      <section ref="chatArea" class="chat-area">
        <p
          v-for="(message, index) in chat_messages"
          :key="index"
          class="message mb-1"
          :class="{
            'message-out': message.user_id === user_id,
            'message-in': message.user_id !== user_id,
          }"
        >
          <small>
            {{ message.display_name }} @
            {{ $moment(message.time_sent).format("hh:mm A") }}</small
          ><br />
          {{ message.message }}
        </p>
      </section>
    </v-sheet>
    <div class="d-flex pa-3 send rounded-b-lg">
      <v-textarea
        v-model="chat_message"
        class="pt-0 white--text"
        rows="1"
        hide-details
        append-outer-icon="mdi-send"
        color="white"
        :disabled="isHistoryMode"
        @click:append-outer="sendMessage"
        @keyup.enter="sendMessage"
      >
      </v-textarea>
    </div>
  </div>
</template>

<script>
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";
import matchMixin from "@/mixins/match";

import BaseVideoChat from "@/components/Session/BaseVideoChat";

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
      chat_height: window.innerHeight,
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
      path: "/chat/new",
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
     * @description Dynamically computes the chat dialog size
     */
    chat_div_height() {
      if (this.is_video_on) {
        return this.chat_height - 430;
      }
      return this.chat_height - 250;
    },
    /**
     * @description Send message
     */
    sendMessage() {
      if (
        _.isNil(this.chat_message) ||
        _.isEmpty(this.chat_message) ||
        this.chat_message === "\n"
      ) {
        return;
      }

      const message = {
        user_id: this.user_id,
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
</style>
