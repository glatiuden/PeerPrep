<template>
  <v-navigation-drawer
    absolute
    :permanent="!small_screen && !is_medium_screen"
    right
  >
    <template #prepend>
      <h4 class="text-center my-3">Match Chat</h4>
      <v-divider></v-divider>
    </template>
    <v-sheet>
      <div>
        <section ref="chatArea" class="chat-area">
          <p
            v-for="(message, index) in messages"
            :key="index"
            class="message message-out mb-1"
          >
            <small>{{ message.username }} @ {{ message.time }}</small
            ><br />
            {{ message.text }}
          </p>
        </section>
      </div>
    </v-sheet>
    <template #append class="mt-2">
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
    </template>
  </v-navigation-drawer>
</template>

<script>
import systemMixin from "@/mixins/system";

export default {
  name: "BaseChat",
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
      messages: [],
      chat_message: "",
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "chat",
      persist: "chat",
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", this.matchId);
    });

    this.socket.on("message", (data) => {
      console.log("Incoming message: ", data);
      this.messages.push(data);
    });
  },
  methods: {
    /**
     * @description Send message
     */
    sendMessage() {
      const message = {
        username: "Max",
        text: this.chat_message,
        time: this.$moment().format("hh:mm A"),
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
  background-color: #78acdb;
}

.headline {
  text-align: center;
  font-weight: 100;
  color: white;
}
.chat-area {
  /*   border: 1px solid #ccc; */
  padding-top: 1em;
  background: white;
  overflow: auto;
  max-width: 350px;
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.5em;
  /*   margin-bottom: .5em; */
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
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: 0.5em;
}
#person2-input {
  padding: 0.5em;
}

.scrollable {
  overflow: auto;
}
</style>
