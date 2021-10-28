<template>
  <div>
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
    <AceEditor
      :value="codes"
      :lang="selected_language"
      theme="monokai"
      width="100%"
      height="595px"
      :options="{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: 15,
        highlightActiveLine: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        showPrintMargin: false,
        showGutter: true,
        readOnly: isHistoryMode,
      }"
      :commands="[
        {
          name: 'save',
          bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
          exec: save,
          readOnly: true,
        },
      ]"
      @input="save($event)"
      @init="editorInit"
    />
    <div class="my-3">
      <v-btn color="primary" depressed :loading="loading" @click="executeCode"
        >Run Your Code (Beta)
      </v-btn>
      <pre v-if="output" class="pre mt-6"><samp>{{ output }}</samp></pre>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import editorMixin from "~/mixins/editor";

export default {
  mixins: [editorMixin],
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
      content: "",
      output: undefined,
      programming_languages: [
        {
          text: "C",
          value: "c_cpp",
          language: "c",
        },
        {
          text: "C++",
          value: "c_cpp",
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
    };
  },
  computed: {
    ...mapGetters({
      match: "match/match",
      codes: "match/codes",
    }),
  },
  mounted() {
    this.selected_language = _.get(
      this.match,
      "match_requirements.programming_language",
    );

    // If is view history -> disable sockets on initializing.
    if (this.isHistoryMode) {
      return;
    }

    this.socket = this.$nuxtSocket({
      name: "editor",
      persist: "editor",
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", this.matchId);
    });

    this.socket.on("message", (data) => {
      console.log("Incoming message: ", data);
      this.UPDATE_CODES({ data });
    });
  },
  methods: {
    ...mapMutations({
      UPDATE_CODES: "match/UPDATE_CODES",
    }),

    // async save(text) {
    //   if (!text) {
    //     return;
    //   }
    //   this.socket.emit("message", {
    //     match_id: this.matchId,
    //     payload: text,
    //   });
    // },
    /**
     * @description On enter
     */
    save: _.throttle(
      async function (text) {
        if (!text) {
          return;
        }
        this.socket.emit("message", {
          match_id: this.matchId,
          payload: text,
        });
      },
      1000,
      { leading: true },
    ),

    editorInit: function () {
      require("brace/theme/monokai");
      require("brace/ext/language_tools"); //language extension prerequsite...
      switch (this.selected_language) {
        case "java":
          require("brace/mode/java");
          require("brace/snippets/java"); //snippet
          break;
        case "javascript":
          require("brace/mode/html");
          require("brace/mode/javascript"); //language
          require("brace/snippets/javascript"); //snippet
          require("brace/mode/less");
          break;
        case "c_cpp":
          require("brace/mode/c_cpp");
          require("brace/snippets/c_cpp"); //snippet
          break;
        case "python":
          require("brace/mode/python");
          require("brace/snippets/python"); //snippet
          break;
      }
    },

    async executeCode() {
      try {
        this.SET_LOADING({ data: true });
        const language_object = _.find(
          this.programming_languages,
          ({ value }) => value === this.selected_language,
        );

        const result = await this.EXECUTE_CODE({
          code: this.codes,
          language: this.selected_language,
        });
        this.output = _.get(result, "output");
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
<style scoped>
.pre {
  padding: 16px;
  border-radius: 4px;
  background-color: #383b40;
  overflow: auto;
  font-family: droid sans mono, inconsolata, menlo, consolas,
    bitstream vera sans mono, courier, monospace;
  font-size: 14px;
  line-height: 20px;
  color: #d5d5d5;
}
</style>
