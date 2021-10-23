<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else class="mx-2">
    <v-toolbar flat class="transparent">
      <v-toolbar-title>
        <h2 class="font-weight-medium">Editor Records</h2>
      </v-toolbar-title>
    </v-toolbar>

    <v-toolbar flat class="transparent my-2">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        outlined
        dense
        hide-details
        class="shrink"
        style="width: 350px"
        clearable
        @input="performSearch"
      />
      <v-spacer></v-spacer>
      <v-dialog v-model="open_dialog" max-width="500px">
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            outlined
            class="rounded-lg"
            large
            depressed
            v-bind="attrs"
            v-on="on"
          >
            <v-icon small left>mdi-plus</v-icon>New Editor
          </v-btn>
        </template>
        <BaseEditorDialog v-if="open_dialog" @close-dialog="closeDialog" />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="editors"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="_id"
      :sort-by="['created_at']"
      :sort-desc="[true]"
      hide-default-footer
      :items-per-page="15"
    >
      <template #body.prepend="{ headers }">
        <td :colspan="headers.length">
          <v-divider></v-divider>
        </td>
      </template>

      <template #item.created_at="{ item }">
        <div class="d-flex">
          Created on
          {{ formatDate(item.created_at, "DD MMMM YYYY, hh:mm A") }}
        </div>
      </template>

      <template #item.content="{ item }">
        <code>
          {{ item.content }}
        </code>
      </template>

      <template #item.actions="{ item }">
        <v-icon class="mr-2" @click="editEditor(item._id)"
          >mdi-pencil-outline</v-icon
        >
        <v-icon @click="deleteEditor(item)">mdi-delete-forever-outline</v-icon>
      </template>

      <template #no-data>No editor records found</template>
    </v-data-table>

    <v-row justify="center" class="my-2">
      <v-col v-if="pages_exists" cols="4">
        <v-pagination
          v-if="editors_pagination.current_page"
          v-model="page"
          :length="editors_pagination.total_pages"
          @input="
            GET_EDITORS_PAGINATED({
              query: search,
              page: $event,
            })
          "
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import editorMixin from "@/mixins/editor";
import systemMixin from "@/mixins/system";

import BaseEditorDialog from "@/components/Editor/BaseEditorDialog";

export default {
  name: "Editor",
  components: { BaseEditorDialog },
  mixins: [editorMixin, systemMixin],
  data() {
    return {
      open_dialog: false,
      headers: [
        {
          text: "Match ID",
          value: "match_id",
          sortable: true,
          class: "data-table-heading",
          width: 250,
        },
        {
          text: "Programming Language",
          value: "programming_language",
          sortable: true,
          class: "data-table-heading",
          width: 250,
        },
        {
          text: "Content",
          value: "content",
          sortable: true,
          class: "data-table-heading",
        },
        {
          text: "Created At",
          value: "created_at",
          sortable: false,
          class: "data-table-heading",
          width: 300,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          class: "background data-table-heading",
          width: 100,
        },
      ],
      search: "",
      page: 1,
    };
  },
  async fetch() {
    try {
      await this.GET_EDITORS_PAGINATED();
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching editors: ${err}.`);
    }
  },
  computed: {
    /**
     * @description pages_exists will return true
     * @returns boolean
     */
    pages_exists() {
      return !!_.get(this.editors_pagination, "total_pages");
    },
  },
  methods: {
    async editEditor(id) {
      try {
        await this.GET_EDITOR({ editor_id: id });
        this.SET_EDITOR_ID({ data: id });
        this.open_dialog = true;
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error updating editor: ${err}.`);
      }
    },

    async deleteEditor(item) {
      const is_confirmed = confirm(
        "Are you sure you want to delete this editor? It is an irreversible action.",
      );

      if (!is_confirmed) {
        return;
      }

      try {
        this.SET_LOADING({ data: true });
        await this.DELETE_EDITOR({
          editor_id: item._id,
        });
        this.$notification.success(`Editor has been deleted successfully.`);
        await this.GET_EDITORS_PAGINATED({
          page: this.page,
          query: this.search,
        });
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error deleting editor: ${err}.`);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },

    /**
     * @description close dialog
     */
    closeDialog() {
      this.open_dialog = false;
    },

    performSearch: _.throttle(
      async function () {
        this.page = 1;
        this.GET_EDITORS_PAGINATED({
          query: this.search,
        });
      },
      1000,
      { leading: true },
    ),
  },
};
</script>

<style scoped>
/deep/ .v-toolbar__content {
  padding: 0px !important;
}

.pre-formatted {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
