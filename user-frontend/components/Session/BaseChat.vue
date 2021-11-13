<template>
  <div>
    <BaseVideoChat
      v-if="!isHistoryMode"
      :match-id="matchId"
      @on-video-chat="onVideoChat"
    />
    <v-divider></v-divider>
    <v-sheet
      ref="chat_panel"
      class="fill-height chat-overflow"
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
      room: false,
    };
  },
  async fetch() {
    if (!this.isHistoryMode) {
      return;
    }

    try {
      const match_id = this.$route.params.id;
      await this.GET_CHAT({ match_id });
    } catch (err) {
      this.SET_CHAT_MESSAGES({ data: [] });
    }
  },
  mounted() {
    if (this.isHistoryMode) {
      return;
    }

    this.socket = this.$nuxtSocket({
      name: "chat",
      persist: "chat",
      path: "/chat/new",
      reconnection: true,
      withCredentials: true,
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", this.matchId);
    });

    this.socket.on("preload", (data) => {
      this.SET_CHAT_MESSAGES({ data });
      this.scrollToElement();
    });

    this.socket.on("message", (data) => {
      this.UPDATE_CHAT_MESSAGES({ data });
      this.scrollToElement();
    });

    this.socket.on("end_session", (match_id) => {
      this.$notification.success(
        `Your partner has ended the match! Your session is ending in 3 seconds...`,
      );
      setTimeout(() => {
        this.$emit("end-match");
      }, 3000);
    });
  },
  destroyed() {
    if (this.isHistoryMode) {
      this.SET_CHAT_MESSAGES({ data: [] });
    }
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
      const is_invalid =
        _.isNil(this.chat_message) ||
        _.isEmpty(this.chat_message) ||
        this.chat_message === "\n";

      if (is_invalid) {
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

    onVideoChat() {
      const message = {
        user_id: this.user_id,
        display_name: this.user.display_name,
        message: `Automated Message: ${this.user.display_name} has joined the video chat.`,
        time_sent: this.$moment(),
      };

      this.socket.emit("message", {
        match_id: this.matchId,
        payload: message,
      });
    },

    scrollToElement() {
      const el = this.$refs.chat_panel;
      this.$nextTick(() => {
        // DOM updated
        el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>
