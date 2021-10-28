<template>
  <v-skeleton-loader
    v-if="loading"
    type="table-heading, table-tbody, table-tfoot"
  >
  </v-skeleton-loader>
  <div v-else>
    <div class="mx-2">
      <v-toolbar flat class="transparent">
        <v-toolbar-title>
          <h2 class="font-weight-medium">Match Records</h2>
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
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="matches"
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

        <template #item.meta.question_title="{ item }">
          <div
            v-if="item.meta && item.meta.question_title"
            @click="$router.push(`/history/${item._id}`)"
          >
            {{ item.meta.question_title }}
          </div>
          <div v-else>No Question Selected</div>
        </template>

        <template #item.meta.partner1_display_name="{ item }">
          {{ getNames(item.meta) }}
        </template>

        <template #item.created_at="{ item }">
          <div class="d-flex">
            Created on
            {{ formatDate(item.created_at, "DD MMMM YYYY, hh:mm A") }}
          </div>
        </template>

        <template #item.actions="{ item }">
          <v-icon class="mr-2" @click="editMatch(item._id)"
            >mdi-pencil-outline</v-icon
          >
          <v-icon @click="deleteMatch(item)">mdi-delete-forever-outline</v-icon>
        </template>

        <template #no-data>No match records found</template>
      </v-data-table>

      <v-row justify="center" class="my-2">
        <v-col v-if="pages_exists" cols="4">
          <v-pagination
            v-if="matches_pagination.current_page"
            v-model="page"
            :length="matches_pagination.total_pages"
            @input="
              GET_MATCHES_PAGINATED({
                query: search,
                page: $event,
              })
            "
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" max-width="500px">
      <MatchDashboard v-if="dialog" @close="() => (dialog = false)" />
    </v-dialog>
  </div>
</template>

<script>
import matchMixin from "@/mixins/match";
import systemMixin from "@/mixins/system";

import MatchDashboard from "@/components/Match/MatchDashboard";

export default {
  name: "Match",
  components: { MatchDashboard },
  mixins: [matchMixin, systemMixin],
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Match Details",
          value: "meta.question_title",
          sortable: true,
          class: "data-table-heading",
          width: 300,
        },
        {
          text: "User(s)",
          value: "meta.partner1_display_name",
          sortable: true,
          class: "data-table-heading",
        },
        {
          text: "Status",
          value: "status",
          sortable: true,
          class: "data-table-heading",
        },
        {
          text: "Programming Language",
          value: "match_requirements.programming_language",
          sortable: true,
          class: "data-table-heading",
        },
        {
          text: "Created At",
          value: "created_at",
          sortable: false,
          class: "data-table-heading",
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
      await this.GET_MATCHES_PAGINATED();
    } catch (err) {
      console.error(err);
      this.$notification.error(`Encountered error fetching match: ${err}.`);
    }
  },
  computed: {
    /**
     * @description pages_exists will return true
     * @returns boolean
     */
    pages_exists() {
      return !!_.get(this.matches_pagination, "total_pages");
    },
  },
  methods: {
    async editMatch(id) {
      try {
        await this.GET_MATCH({ match_id: id });
        this.dialog = true;
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error updating match: ${err}.`);
      }
    },

    async deleteMatch(item) {
      const is_confirmed = confirm(
        "Are you sure you want to delete this match? It is an irreversible action.",
      );

      if (!is_confirmed) {
        return;
      }

      try {
        this.SET_LOADING({ data: true });
        await this.DELETE_MATCH({
          match_id: item._id,
        });
        this.$notification.success(`Match has been deleted successfully.`);
        await this.GET_MATCHES_PAGINATED({
          page: this.page,
          query: this.search,
        });
      } catch (err) {
        console.error(err);
        this.$notification.error(`Encountered error deleting match: ${err}.`);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },

    performSearch: _.throttle(
      async function () {
        this.page = 1;
        this.GET_MATCHES_PAGINATED({
          query: this.search,
        });
      },
      1000,
      { leading: true },
    ),

    /**
     * @description Determines the partner name by checking against own
     */
    getNames(meta) {
      const partner1_display_name = _.get(meta, "partner1_display_name");
      const partner2_display_name = _.get(meta, "partner2_display_name");
      if (partner1_display_name && partner2_display_name) {
        return `${partner1_display_name} & ${partner2_display_name}`;
      }
      return "User(s) informatio not found";
    },
  },
};
</script>

<style scoped>
/deep/ .v-toolbar__content {
  padding: 0px !important;
}
</style>
