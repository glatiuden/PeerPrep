<template>
  <div>
    <v-select
      v-model="selected_language"
      label="Programming Language"
      :items="programming_languages"
      outlined
      dense
      hide-details="auto"
      item-text="text"
      item-value="value"
      @change="editorInit"
    >
    </v-select>
    <AceEditor
      v-model="content"
      class="my-3"
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
      }"
      :commands="[
        {
          name: 'save',
          bindKey: { win: 'Ctrl-s', mac: 'Command-s' },
          exec: save,
          readOnly: true,
        },
      ]"
      @init="editorInit"
    />
  </div>
</template>
<script>
import editorMixins from "~/mixins/editor";

export default {
  mixins: [editorMixins],
  data() {
    return {
      selected_language: "javascript",
      content: "",
      programming_languages: [
        {
          text: "C++",
          value: "c_cpp",
        },
        {
          text: "Java",
          value: "java",
        },
        {
          text: "JavaScript",
          value: "javascript",
        },
      ],
      match_id: "abc123", // Temporarily hardcoded
    };
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: "editor",
    });

    this.socket.on("connect", () => {
      this.socket.emit("room", this.match_id);
    });

    this.socket.on("message", (data) => {
      console.log("Incoming message: ", data);
      this.content = data;
    });
  },
  methods: {
    async save() {
      this.socket.emit("message", {
        match_id: this.match_id,
        payload: this.content,
      });

      // Save to DB for persistent storage, for later usage.
      // const editor_data = {
      //   match_id,
      //   programming_language: this.selected_language,
      //   content: this.content,
      // };
      // await this.CREATE_EDITOR({
      //   editor: editor_data,
      // });
    },
    editorInit: function () {
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
      }
      require("brace/theme/monokai");
    },
  },
};
</script>
