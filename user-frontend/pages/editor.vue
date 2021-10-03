<template>
  <v-row>
    <v-col class="text-center">
      <v-select
        v-model="selected_language"
        :items="['java', 'c_cpp', 'javascript']"
        @change="editorInit"
      >
      </v-select>
      <AceEditor
        v-model="content"
        :lang="selected_language"
        theme="monokai"
        width="100%"
        height="300px"
        :options="{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          fontSize: 14,
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
    </v-col>
  </v-row>
</template>
<script>
import editorMixins from "@/mixins/note";

export default {
  mixins: [editorMixins],
  data() {
    return {
      selected_language: "javascript",
      content: "let a = 123;\nlet b = 321;",
    };
  },
  // async fetch() {
  //   const db_value = await this.GET_EDITOR({
  //     editor_id: "6159e05a1166e6ca0e78bfa1",
  //   });
  //   if (db_value) {
  //     this.content = db_value.content;
  //   }
  // },
  methods: {
    async save() {
      const mock_data = {
        match_id: "6159df98a525e1a46872718c",
        content: this.content,
      };

      await this.CREATE_EDITOR({
        editor: mock_data,
      });
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
