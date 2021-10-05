<template>
  <div>
    <h2>Chat with Your Partner</h2>
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
              <b>{{ message.name }}</b> @ {{ message.time }}
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
import systemMixins from "@/mixins/system";

export default {
  name: "BaseChat",
  mixins: [systemMixins],
  data() {
    return {
      messages: [],
      chat_message: "",
    };
  },
  methods: {
    sendMessage() {
      this.messages.push({
        name: "Max",
        text: this.chat_message,
        time: this.$moment().format("hh:mm A"),
        username: "Max",
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

.message {
  border: 1px solid lightblue;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
}

.message-title {
  font-size: 1rem;
  display: inline;
}

.message-text {
  color: gray;
  margin-bottom: 0;
}

.user-typing {
  height: 1rem;
}

.receive {
  background-color: #182533;
}

.send {
  background-color: #78acdb;
}
</style>
