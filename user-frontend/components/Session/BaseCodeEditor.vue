<template>
  <div class="mt-3">
    <v-select
      v-if="false"
      v-model="selected_language"
      label="Programming Language"
      :items="programming_languages"
      outlined
      dense
      hide-details="auto"
      item-text="text"
      item-value="value"
      disabled
      @change="editorInit"
    >
    </v-select>
    <div id="monaco-editor" ref="editor" />
    <div class="my-3">
      <v-btn color="primary" depressed :loading="loading" @click="executeCode"
        >Run Your Code (Beta)
      </v-btn>
      <pre
        v-if="!code_output"
        class="pre mt-6"
      ><v-textarea v-model="code_input" rows="1" label="Input (If any; else leave blank)" auto-grow hide-details class="custom-label-color" dark></v-textarea></pre>
      <pre v-else class="pre mt-6"><samp>{{ code_output }}</samp></pre>
    </div>
  </div>
</template>
<script>
import matchMixin from "@/mixins/match";
import * as Y from "yjs";
import { MonacoBinding } from "y-monaco";
import loader from "@monaco-editor/loader";
import { WebsocketProvider } from "y-websocket";

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
      programming_languages: [
        {
          text: "C",
          value: "cpp",
          language: "cpp",
        },
        {
          text: "C++",
          value: "cpp",
          language: "cpp",
        },
        {
          text: "Java",
          value: "java",
          language: "java",
        },
        {
          text: "JavaScript",
          value: "javascript",
          language: "js",
        },
        {
          text: "Python",
          value: "python",
          language: "py",
        },
      ],
      ydoc: undefined,
      provider: undefined,
    };
  },
  async fetch() {
    if (!this.isHistoryMode) {
      return;
    }
    await this.GET_EDITOR({ match_id: this.matchId });
  },
  async mounted() {
    this.selected_language = _.get(
      this.match,
      "match_requirements.programming_language",
    );

    // If is view history -> disable sockets on initializing.
    if (this.isHistoryMode) {
      return;
    }

    this.ydoc = new Y.Doc();
    try {
      this.provider = new WebsocketProvider(
        "ws://localhost:3004",
        this.matchId,
        this.ydoc,
      );

      const type = this.ydoc.getText("monaco");

      const editor_ref = this.$refs.editor;
      const monaco = await loader.init();
      const editor = monaco.editor.create(editor_ref, {
        value: "",
        language: this.selected_language,
        theme: "vs-dark",
      });
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
        const result = await this.EXECUTE_CODE({
          code: this.codes,
          language: this.selected_language,
          input: this.code_input,
        });
        console.log(result);
        this.code_output = _.get(result, "output");
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error executing code: ${err}`);
      } finally {
        this.SET_LOADING({ data: false });
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
