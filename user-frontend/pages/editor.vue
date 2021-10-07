<template>
  <v-row class="app-max-width mx-auto">
    <v-col cols="12">
      <v-card outlined>
        <v-card-title
          >Question: {Question Name}
          <v-spacer></v-spacer>
          <b>Time Left: 15:00</b>
        </v-card-title>
        <v-card-text> Question Body </v-card-text>
        <v-card-actions class="pb-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" depressed>Hint</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" lg="8">
      <BaseCodeEditor />
    </v-col>
    <v-col> <BaseChat /> </v-col>
  </v-row>
</template>
<script>
import editorMixins from "~/mixins/editor";

import BaseChat from "@/components/Editor/BaseChat";
import BaseCodeEditor from "@/components/Editor/BaseCodeEditor";

export default {
  components: {
    BaseChat,
    BaseCodeEditor,
  },
  mixins: [editorMixins],
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "home",
    });
    /* Listen for events: */
    this.socket.on("connection", (msg, cb) => {
      console.log(msg);
      /* Handle event */
    });
  },
};
</script>
