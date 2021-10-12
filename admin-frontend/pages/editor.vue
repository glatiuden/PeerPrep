<template>
  <div class="mx-2">
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
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
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
            <v-icon small left>mdi-account-plus-outline</v-icon>New Editor
          </v-btn>
        </template>
        <BaseEditorDialog @close="() => (dialog = false)" />
      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="editors"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="_id"
      :sort-by="['updated_at', 'client_id']"
      :sort-desc="[true, false]"
      hide-default-footer
      :items-per-page="15"
    >
      <template #body.prepend="{ headers }">
        <td :colspan="headers.length">
          <v-divider></v-divider>
        </td>
      </template>

      <template #item.actions="{ item }">
        <v-icon
          class="mr-2"
          @click="$router.push(`/system-configurations/${item._id}/update`)"
          >mdi-pencil-outline</v-icon
        >
        <v-icon @click="clickDelete(item)">mdi-delete-forever-outline</v-icon>
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
            GET_SYSTEM_CONFIGURATIONS_PAGINATED({
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

export default {
  name: "Editor",
  mixins: [editorMixin, systemMixin],
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Match ID",
          value: "match_id",
          sortable: true,
          class: "background data-table-heading",
          width: 250,
        },
        {
          text: "programming_language",
          value: "programming_language",
          sortable: true,
          class: "background data-table-heading",
        },
        {
          text: "Created At",
          value: "created_at",
          sortable: false,
          class: "background data-table-heading",
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
    performSearch: _.throttle(
      async function () {
        this.page = 1;
        this.GET_RESUMES_GROUP_BY_USER({
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
</style>
