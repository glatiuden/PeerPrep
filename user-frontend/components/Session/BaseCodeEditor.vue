<template>
  <div class="mt-3">
    <div
      id="monaco-editor"
      ref="editor"
      :class="`monaco-height ${isHistoryMode ? '-tall' : ''}`"
    />
    <div v-if="!isHistoryMode" class="my-3">
      <pre
        class="pre"
      >Run Your Code<v-textarea v-model="code_input" dense rows="1" placeholder="Input (If any; else leave blank)" 
        hide-details class="custom-label-color" 
        dark append-outer-icon="mdi-play" :disabled="execute_code_loading"
        :loading="execute_code_loading" @click:append-outer="executeCode" @keyup.enter="executeCode"></v-textarea></pre>
      <pre
        v-if="code_output"
        class="pre mt-6 py-6"
      ><samp>{{ code_output }}</samp></pre>
    </div>
  </div>
</template>
<script>
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import { WebsocketProvider } from "y-websocket";
import loader from "@monaco-editor/loader";

import matchMixin from "@/mixins/match";

export default {
  mixins: [matchMixin],
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
      selected_language: "javascript",
      code_output: undefined,
      code_input: undefined,
      ydoc: undefined,
      provider: undefined,
      execute_code_loading: false,
      socket_url: process.env.SERVER_URL
        ? `${process.env.SERVER_URL}/editor`
        : "ws://localhost:3004",
    };
  },
  async mounted() {
    this.selected_language = _.get(
      this.match,
      "match_requirements.programming_language",
    ).toLowerCase();

    let editor_language = this.selected_language;
    switch (editor_language) {
      case "c":
      case "c++":
        editor_language = "cpp";
        break;
      case "c#":
        editor_language = "cs";
        break;
      default:
        break;
    }

    const editor_ref = this.$refs.editor;
    const monaco = await loader.init();

    try {
      await this.GET_EDITOR({ match_id: this.matchId });
    } catch (err) {
      this.UPDATE_CODES({ data: "" });
    }

    const editor = monaco.editor.create(editor_ref, {
      value: this.codes,
      language: editor_language,
      theme: "vs-dark",
      readOnly: this.isHistoryMode,
    });

    // If is view history -> disable sockets on initializing.
    if (this.isHistoryMode) {
      return;
    }

    this.ydoc = new Y.Doc();
    try {
      this.provider = new WebsocketProvider(
        `${this.socket_url.replace("https", "wss")}`,
        this.matchId,
        this.ydoc,
      );

      const type = this.ydoc.getText("monaco");
      const awareness = this.provider.awareness;
      new MonacoBinding(type, editor.getModel(), new Set([editor]), awareness);
      this.provider.connect();
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error loading editor: ${err}`);
    }
  },
  destroyed() {
    if (this.provider) {
      this.provider.disconnect();
    }
  },
  methods: {
    async executeCode() {
      try {
        this.execute_code_loading = true;
        const result = await this.EXECUTE_CODE({
          code: this.ydoc.getText("monaco").toJSON(),
          language: this.selected_language,
          input: this.code_input,
        });
        this.code_output = _.get(result, "output");
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error executing code: ${err}`);
      } finally {
        this.execute_code_loading = false;
      }
    },
  },
};
</script>
