<template>
  <div class="mt-3">
    <div id="monaco-editor" ref="editor" />
    <div class="my-3">
      <pre
        class="pre"
      >Run Your Code<v-textarea v-model="code_input" dense rows="1" placeholder="Input (If any; else leave blank)" 
        hide-details class="custom-label-color" 
        dark append-outer-icon="mdi-play" :disabled="execute_code_loading"
        :loading="execute_code_loading" @click:append-outer="executeCode" @keyup.enter="executeCode"></v-textarea></pre>
      <!-- <v-btn color="primary" depressed :loading="loading" @click="executeCode"
        >Run Your Code
      </v-btn> -->
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
    };
  },
  async fetch() {
    if (!this.isHistoryMode) {
      return;
    }

    try {
      await this.GET_EDITOR({ match_id: this.matchId });
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching editor: ${err}`);
    }
  },
  async mounted() {
    this.selected_language = _.get(
      this.match,
      "match_requirements.programming_language",
    ).toLowerCase();

    const editor_language = this.selected_language;
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
        `wss://${process.env.SERVER_URL}/editor`,
        this.matchId,
        this.ydoc,
      );

      const type = this.ydoc.getText("monaco");
      const awareness = this.provider.awareness;
      new MonacoBinding(type, editor.getModel(), new Set([editor]), awareness);
      this.provider.connect();
    } catch (err) {
      console.error(err);
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
<style>
#monaco-editor {
  height: 600px;
}

.yRemoteSelection {
  background-color: rgb(250, 129, 0, 0.5);
}

.yRemoteSelectionHead {
  position: absolute;
  border-left: orange solid 2px;
  border-top: orange solid 2px;
  border-bottom: orange solid 2px;
  height: 100%;
  box-sizing: border-box;
}

.yRemoteSelectionHead::after {
  position: absolute;
  content: " ";
  border: 3px solid orange;
  border-radius: 4px;
  left: -4px;
  top: -5px;
}

.custom-label-color .v-label {
  color: white !important;
}

.custom-label-color input {
  color: white !important;
}
</style>
