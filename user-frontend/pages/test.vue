<template>
  <div>
    <div id="monaco-editor" ref="editor" />
    <v-btn @click="test()"> </v-btn>
  </div>
</template>
<script>
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import loader from "@monaco-editor/loader";
import { WebsocketProvider } from "y-websocket";

export default {
  data() {
    return {
      ydoc: undefined,
    };
  },
  async mounted() {
    this.ydoc = new Y.Doc();
    try {
      //syncs the ydoc throught WebRTC connection
      // const provider = new WebrtcProvider("monaco", this.ydoc, {
      //   signaling: ["ws://localhost:3002"],
      // });
      const provider = new WebsocketProvider(
        "ws://localhost:3002/editor",
        "monaco",
        this.ydoc,
      );

      const type = this.ydoc.getText("monaco");

      const editor_ref = this.$refs.editor;
      const monaco = await loader.init();
      const editor = monaco.editor.create(editor_ref, {
        value: "",
        language: "javascript",
        theme: "vs-dark",
      });

      const awareness = provider.awareness;

      const color = "#bc80bd";
      awareness.setLocalStateField("user", {
        name: "John",
        color: color,
      });

      const monacoBinding = new MonacoBinding(
        type,
        editor.getModel(),
        new Set([editor]),
        awareness,
      );
      console.log(monacoBinding);
      provider.connect();
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    test() {
      console.log(this.ydoc.getText("monaco").toJSON());
    },
  },
};
</script>
<style>
#monaco-editor {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
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
</style>
