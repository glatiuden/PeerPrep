<template>
  <div class="fill-height">
    <h3 class="text-center my-3">Match History</h3>
    <v-data-table
      :headers="headers"
      :items="matches"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="_id"
      :sort-by="['created_at']"
      :sort-desc="[true]"
      :page.sync="page"
      hide-default-footer
      :items-per-page="15"
      class="soft-box-shadow"
    >
      <template #item.status="{ item }">
        <v-chip class="white--text" :color="status_chip_colors[item.status]">
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.updated_at="{ item }">
        <div class="d-flex">
          {{ formatDateOrNow(item.updated_at, "DD MMMM YYYY, hh:mm A") }}
        </div>
      </template>

      <template #item.actions="{ item }">
        <v-icon class="mr-2">mdi-pencil-outline</v-icon>
      </template>

      <template #no-data>No match available</template>
    </v-data-table>

    <v-row justify="center" class="my-2">
      <v-col v-if="pages_exists" cols="4">
        <v-pagination
          v-if="matches_pagination.current_page"
          v-model="page"
          :length="matches_pagination.total_pages"
          @input="
            GET_MATCHES({
              user_id,
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
import systemMixin from "@/mixins/system";
import userMixin from "@/mixins/user";
import matchMixin from "@/mixins/match";

export default {
  name: "BaseMatchHistory",
  mixins: [systemMixin, userMixin, matchMixin],
  data() {
    return {
      headers: [
        {
          text: "Question",
          value: "question_id",
          sortable: true,
          class: "data-table-heading",
          width: 350,
        },
        {
          text: "Status",
          value: "status",
          sortable: true,
          class: "data-table-heading",
          width: 250,
        },
        {
          text: "Programming Language",
          value: "meta.programming_language",
          sortable: true,
          class: "data-table-heading",
          width: 250,
        },
        {
          text: "Match Date",
          value: "updated_at",
          sortable: true,
          class: "data-table-heading",
        },
      ],
      search: "",
      page: 1,
      status_chip_colors: {
        waiting: "grey",
        "in-progress": "orange",
        completed: "green",
        cancelled: "red",
      },
    };
  },
  async fetch() {
    try {
      this.SET_LOADING({ data: true });
      await this.GET_MATCHES({ user_id: this.user_id });
    } catch (err) {
      console.error(err);
      this.$notification.error(
        `Encountered error fetching user's match history: ${err}`,
      );
    } finally {
      this.SET_LOADING({ data: false });
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
};
</script>
