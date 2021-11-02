<template>
  <div class="fill-height">
    <v-card class="my-9 my-sm-1 rounded-lg" outlined>
      <v-card-title class="justify-center text-body-1">
        <h2>Match History</h2>
      </v-card-title>
      <v-card-text class="d-flex">
        <v-row>
          <v-col cols="12" sm="3">
            <v-autocomplete
              v-model="selected_statuses"
              :items="['waiting', 'in-progress', 'completed', 'cancelled']"
              :loading="loading"
              label="Status"
              class="rounded-0"
              multiple
              outlined
              dense
              hide-details
              clearable
              @change="performFilter"
            >
              <template #selection="{ index }">
                <span v-if="index === 0">
                  Selected:
                  {{ selected_statuses.length }}
                </span>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" sm="3">
            <v-autocomplete
              v-model="selected_modes"
              :loading="loading"
              :items="['elo', 'question']"
              label="Mode"
              item-value="value"
              item-text="text"
              class="rounded-0"
              multiple
              outlined
              dense
              hide-details
              @change="performFilter"
            >
              <template #selection="{ index }">
                <span v-if="index === 0">
                  Selected:
                  {{ selected_modes.length }}
                </span>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              class="rounded-0"
              single-line
              outlined
              dense
              hide-details
              clearable
              @input="performSearch"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <div class="d-flex my-3">
      <v-chip
        v-if="search"
        class="mr-4"
        close
        @click:close="closeChip('search')"
      >
        Search: {{ search }}
      </v-chip>

      <template v-if="selected_modes.length > 0">
        <v-chip
          v-for="level in selected_modes"
          :key="level"
          class="mr-4"
          close
          color="primary"
          @click:close="closeChip('difficulty_level', level)"
        >
          Difficulty:&nbsp;<b>{{ level | capitalize }}</b>
        </v-chip>
      </template>

      <template v-if="selected_statuses.length > 0">
        <v-chip
          v-for="topic in selected_statuses"
          :key="topic"
          close
          class="mr-4"
          color="primary"
          @click:close="closeChip('topic', topic)"
        >
          Status: {{ topic }}
        </v-chip>
      </template>
    </div>
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
      @click:row="$router.push(`/session/${$event._id}?history=true`)"
    >
      <template #item.meta.question_title="{ item }">
        <div v-if="item.meta && item.meta.question_title">
          {{ item.meta.question_title }} <br />
          (with {{ getPartnerName(item.meta) }})
        </div>
        <div v-else>No Question Selected</div>
      </template>

      <template #item.mode="{ item }">
        <v-chip class="white--text" :color="mode_chip_colors[item.mode]">
          <v-icon left small>{{
            item.mode === "elo"
              ? "mdi-shield-sword-outline"
              : "mdi-chat-question-outline"
          }}</v-icon>
          {{ item.mode }}
        </v-chip>
      </template>

      <template #item.status="{ item }">
        <v-chip class="white--text" :color="status_chip_colors[item.status]">
          {{ item.status }}
        </v-chip>
      </template>

      <template #item.match_requirements.programming_language="{ item }">
        <span class="text-capitalize">
          {{ item.match_requirements.programming_language }}</span
        >
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
          text: "Match Details",
          value: "meta.question_title",
          sortable: true,
          class: "data-table-heading",
          width: 300,
        },
        {
          text: "Mode",
          value: "mode",
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
          text: "Date",
          value: "updated_at",
          sortable: true,
          class: "data-table-heading",
        },
      ],
      search: undefined,
      page: 1,
      status_chip_colors: {
        waiting: "grey",
        "in-progress": "orange",
        completed: "green",
        cancelled: "red",
      },
      selected_modes: [],
      selected_statuses: [],
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
  methods: {
    /**
     * @description Perform text search
     */
    performSearch: _.throttle(
      async function () {
        this.page = 1;
        this.GET_MATCHES({
          user_id: this.user_id,
          query: this.search,
          status: this.selected_statuses,
          mode: this.selected_modes,
        });
      },
      1000,
      { leading: true },
    ),
    /**
     * @description Remove filters from query
     */
    closeChip(type, value = "") {
      switch (type) {
        case "mode":
          this.selected_modes = _.filter(
            this.selected_modes,
            (mode) => mode != value,
          );
          break;
        case "status":
          this.selected_statuses = _.filter(
            this.selected_statuses,
            (status) => status != value,
          );
          break;
        case "search":
          this.search = "";
          break;
      }
      this.performFilter();
    },
    /**
     * @description Perform filtering
     */
    async performFilter() {
      this.page = 1;
      try {
        await this.GET_MATCHES({
          user_id: this.user_id,
          query: this.search,
          status: this.selected_statuses,
          mode: this.selected_modes,
        });
      } catch (err) {
        console.error(err);
      }
    },
    /**
     * @description Determines the partner name by checking against own
     */
    getPartnerName(meta) {
      const partner1_display_name = _.get(meta, "partner1_display_name");
      const partner2_display_name = _.get(meta, "partner2_display_name");
      if (partner1_display_name === this.user.display_name) {
        return partner2_display_name;
      }
      return partner1_display_name;
    },
  },
};
</script>
