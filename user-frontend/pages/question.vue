<template>
  <div class="app-max-width mx-auto px-3">
    <v-row>
      <v-col>
        <BaseQuestionCategoryCard />
      </v-col>
      <v-col>
        <BaseQuestionCategoryCard />
      </v-col>
      <v-col>
        <BaseQuestionCategoryCard />
      </v-col>
    </v-row>

    <v-row class="my-3">
      <v-col cols="12" sm="3">
        <v-autocomplete
          v-model="selected_difficulty_levels"
          :items="difficulty_levels"
          :loading="loading"
          label="Difficulty Level"
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
              {{ selected_difficulty_levels.length }}
            </span>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col cols="12" sm="3">
        <v-autocomplete
          v-model="selected_topics"
          :items="question_topics"
          :loading="loading"
          label="Topic"
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
              {{ selected_topics.length }}
            </span>
          </template>
        </v-autocomplete>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" sm="3">
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

    <div class="d-flex my-3">
      <v-chip
        v-if="search"
        class="mr-4"
        close
        @click:close="closeChip('search')"
      >
        Search: {{ search }}
      </v-chip>

      <template v-if="selected_difficulty_levels.length > 0">
        <v-chip
          v-for="level in selected_difficulty_levels"
          :key="level"
          class="mr-4"
          close
          color="primary"
          @click:close="closeChip('difficulty_level', level)"
        >
          Difficulty:&nbsp;<b>{{ level | capitalize }}</b>
        </v-chip>
      </template>

      <template v-if="selected_topics.length > 0">
        <v-chip
          v-for="topic in selected_topics"
          :key="topic"
          close
          class="mr-4"
          color="primary"
          @click:close="closeChip('topic', topic)"
        >
          Topic: {{ topic }}
        </v-chip>
      </template>
    </div>

    <v-dialog v-model="open_dialog" max-width="950px">
      <BaseQuestionDialog @close="open_dialog = false" />
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="questions"
      :loading="loading"
      loading-text="Loading... Please wait"
      item-key="_id"
      :sort-by="['created_at']"
      :sort-desc="[true]"
      :page.sync="page"
      hide-default-footer
      :items-per-page="15"
      class="elevation-2"
    >
      <template #item.title="{ item }">
        <span class="clickable" @click="openQuestionDialog(item._id)">
          {{ item.title }}
        </span>
      </template>

      <template #item.difficulty="{ item }">
        <v-chip class="white--text" :color="chip_colors[item.difficulty]">
          {{ item.difficulty }}
        </v-chip>
      </template>

      <template #item.created_at="{ item }">
        <div class="d-flex">
          {{ formatDateOrNow(item.created_at, "DD MMMM YYYY, hh:mm A") }}
        </div>
      </template>

      <template #item.actions="{ item }">
        <v-icon class="mr-2">mdi-pencil-outline</v-icon>
      </template>

      <template #no-data>No question available</template>
    </v-data-table>

    <v-row justify="center" class="my-2">
      <v-col v-if="pages_exists" cols="4">
        <v-pagination
          v-if="questions_pagination.current_page"
          v-model="page"
          :length="questions_pagination.total_pages"
          @input="
            GET_QUESTIONS_PAGINATED({
              query: search,
              page: $event,
            })
          "
        ></v-pagination>
      </v-col>
    </v-row>
    <v-dialog v-model="open_matching_dialog" max-width="550px">
      <BaseMatchingDialog />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import systemMixin from "@/mixins/system";
import questionMixin from "@/mixins/question";

import BaseQuestionCategoryCard from "@/components/Question/BaseQuestionCategoryCard";
import BaseQuestionDialog from "@/components/Question/BaseQuestionDialog";
import BaseMatchingDialog from "@/components/Match/BaseMatchingDialog";

export default {
  name: "Question",
  components: {
    BaseQuestionCategoryCard,
    BaseQuestionDialog,
    BaseMatchingDialog,
  },
  mixins: [systemMixin, questionMixin],
  data() {
    return {
      headers: [
        {
          text: "Title",
          value: "title",
          sortable: true,
          class: "data-table-heading",
          width: 350,
        },
        {
          text: "Topic",
          value: "topic",
          sortable: true,
          class: "data-table-heading",
          width: 250,
        },
        {
          text: "Difficulty",
          value: "difficulty",
          sortable: true,
          class: "data-table-heading",
          width: 250,
        },
        {
          text: "Published on",
          value: "created_at",
          sortable: true,
          class: "data-table-heading",
          width: 300,
        },
      ],
      search: "",
      page: 1,
      selected_difficulty_levels: [],
      selected_topics: [],
      open_dialog: false,
    };
  },
  async fetch() {
    try {
      await Promise.all([
        this.GET_QUESTIONS_PAGINATED(),
        this.GET_QUESTION_TOPICS(),
      ]);
    } catch (err) {
      console.error(err);
    }
  },
  computed: {
    ...mapGetters({
      open_matching_dialog: "match/open_matching_dialog",
    }),
    /**
     * @description pages_exists will return true
     * @returns boolean
     */
    pages_exists() {
      return !!_.get(this.questions_pagination, "total_pages");
    },
  },
  methods: {
    /**
     * @description Perform text search
     */
    performSearch: _.throttle(
      async function () {
        this.page = 1;
        this.GET_QUESTIONS_PAGINATED({
          query: this.search,
          difficulty_levels: this.selected_difficulty_levels,
          topics: this.selected_topics,
        });
      },
      1000,
      { leading: true },
    ),

    /**
     * @description Perform filtering
     */
    async performFilter() {
      this.page = 1;
      try {
        await this.GET_QUESTIONS_PAGINATED({
          query: this.search,
          difficulty_levels: this.selected_difficulty_levels,
          topics: this.selected_topics,
        });
      } catch (err) {
        console.error(err);
      }
    },

    /**
     * @description Remove filters from query
     */
    closeChip(type, value = "") {
      switch (type) {
        case "difficulty_level":
          this.selected_difficulty_levels = _.filter(
            this.selected_difficulty_levels,
            (level) => level != value,
          );
          break;
        case "topic":
          this.selected_topics = _.filter(
            this.selected_topics,
            (topic) => topic != value,
          );
          break;
        case "search":
          this.search = "";
          break;
      }
      this.performFilter();
    },

    /**
     * @description Load the question from server and opens the dialog
     */
    async openQuestionDialog(question_id) {
      try {
        this.SET_LOADING({ data: true });
        await this.GET_QUESTION({ question_id });
        this.open_dialog = true;
      } catch (err) {
        console.error(err);
      } finally {
        this.SET_LOADING({ data: false });
      }
    },
  },
};
</script>
