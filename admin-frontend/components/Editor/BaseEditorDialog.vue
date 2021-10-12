<template>
  <v-card>
    <v-card-title> New Editor </v-card-title>
    <v-divider></v-divider>
    <v-form v-model="valid">
      <v-card-text>
        <v-container>
          <v-text-field
            v-model="new_editor.match_id"
            :counter="255"
            :rules="match_id_rules"
            label="Match ID"
            hint="The match ID of this editor record"
            required
            outlined
            dense
          />

          <v-text-field
            v-model="new_editor.programming_language"
            :counter="360"
            :rules="programming_language_rules"
            label="Programming Language"
            hint="Programming language of the editor"
            required
            outlined
            dense
          ></v-text-field>

          <v-textarea
            v-model="new_editor.content"
            :rules="content_rules"
            label="Content"
            hint="Code of the editor"
            required
            outlined
            dense
          ></v-textarea>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text :loading="loading" @click="closeDialog"
          >Cancel
        </v-btn>
        <v-btn
          color="primary"
          :loading="loading"
          text
          :disabled="!valid"
          @click="addEditor"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import editorMixin from "@/mixins/editor";

export default {
  name: "BaseEditorDialog",
  mixins: [editorMixin],
  data() {
    return {
      valid: false,
      new_editor: {
        match_id: "",
        programming_language: "",
        content: "",
      },
      default_editor: {
        match_id: "",
        programming_language: "",
        content: "",
      },
      match_id_rules: [
        (v) => !!v || "Match ID is required",
        (v) =>
          (v && v.length <= 255) || "Match ID must be less than 255 characters",
      ],
      programming_language_rules: [
        (v) => !!v || "Programming Language is required",
        (v) =>
          (v && v.length <= 255) ||
          "Programming Language must be less than 255 characters",
      ],
      content_rules: [
        (v) => !!v || "Content is required",
        (v) =>
          (v && v.length <= 255) || "Content must be less than 255 characters",
      ],
    };
  },
  mounted() {
    this.resetEditor();
  },
  methods: {
    /**
     * @description: add a new editor to server + store
     */
    async addEditor() {
      try {
        this.SET_LOADING({ data: true });
        await this.CREATE_EDITOR({
          editor: this.new_editor,
        });
        await this.GET_EDITORS_PAGINATED();
        this.$notification.success(`Editor has been created successfully.`);
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error adding editor: ${err}.`);
      } finally {
        this.SET_LOADING({ data: false });
        this.resetEditor();
        this.$emit("close");
      }
    },
    /**
     * @description: update editor to server + store
     */
    async updateEditor() {
      try {
        this.SET_LOADING({ data: true });
        await this.UPDATE_EDITOR({
          editor: {
            ...this.new_editor,
            id: this.editor_id,
          },
        });
        await this.GET_EDITORS_PAGINATED();
        this.$notification.success(`Editor has been updated successfully.`);
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error updating editor: ${err}.`);
      } finally {
        this.closeDialog();
      }
    },
    /**
     * @description reset editor object when mounted again
     */
    resetEditor() {
      this.new_editor = this.default_editor;
    },
    /**
     * @description reset editor object when mounted again
     */
    closeDialog() {
      this.SET_LOADING({ data: false });
      this.resetEditor();
      this.SET_EDITOR_ID({ data: "" });
      this.$emit("close");
    },
  },
};
</script>
