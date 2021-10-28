<template>
  <div>
    <div class="light_primary rounded-lg pa-6">
      <div class="app-max-width mx-auto px-2">
        <h2 class="text-center mb-3">Featured Topics</h2>
        <v-btn color="primary" text :loading="loading" @click="createQuestion" align="right">
          Create Question
        </v-btn>
        <v-row align-content="start" align="stretch">
          <v-col
            v-for="(topic, index) in question_topics"
            :key="index"
            cols="12"
            md="4"
          >
            <BaseQuestionCategoryCard
              :topic="topic"
              :index="index"
              @perform-filter="performFilter"
            />
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="app-max-width mx-auto pt-6 px-8 px-lg-2">
      <v-card class="my-9 my-sm-4 rounded-lg" outlined>
        <v-card-title class="justify-center text-body-1">
          <h2>Questions</h2>
          <v-btn
            icon
            class="text--secondary"
            color="#0560AD"
            @click="open_info_dialog = !open_info_dialog"
          >
            <v-icon color="#0560AD">mdi-information</v-icon>
          </v-btn>
          <v-dialog v-model="open_info_dialog" max-width="600" max-height="400">
            <v-card>
              <v-card-title class="justify-center">
                Questions on PeerPrep
              </v-card-title>
              <v-card-text>
                <ul>
                  <li>
                    Questions on PeerPrep are curated from popular online
                    competitive programming platforms such as Leetcode and
                    Hackerrank.
                  </li>
                  <li>We do not own any of the questions and solutions.</li>
                </ul>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-card-title>
        <v-card-text class="d-flex">
          <v-row>
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
                :items="question_topics"
                :loading="loading"
                label="Topic"
                class="rounded-0"
                multiple
                outlined
                dense
                hide-details
                clearable
                @change="
                  SET_SELECTED_TOPICS({ data: $event });
                  performFilter();
                "
              >
                <template #selection="{ index }">
                  <span v-if="index === 0">
                    Selected:
                    {{ selected_topics.length }}
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
        class="soft-box-shadow"
      >
        <template #item.title="{ item }">
          <span class="clickable" @click="openQuestionDialog(item._id)">
            {{ item.title }}
          </span>
        </template>

        <template #item.difficulty="{ item }">
          <v-chip
            class="white--text"
            :color="difficulty_chip_colors[item.difficulty]"
          >
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import systemMixin from "@/mixins/system";
import questionMixin from "@/mixins/question";

import BaseQuestionCategoryCard from "@/components/Question/BaseQuestionCategoryCard";
import BaseQuestionDialog from "@/components/Question/BaseQuestionDialog";

export default {
  name: "Question",
  components: {
    BaseQuestionCategoryCard,
    BaseQuestionDialog,
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
      search: undefined,
      page: 1,
      selected_difficulty_levels: [],
      open_dialog: false,
      open_info_dialog: false,
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
      this.$notification.error(`Encountered error fetching questions: ${err}`);
    }
  },
  computed: {
    ...mapGetters({
      has_user: "user/has_user",
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
        this.$notification.error(
          `Encountered error fetching questions: ${err}`,
        );
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
          this.SET_SELECTED_TOPICS({
            data: _.filter(this.selected_topics, (topic) => topic != value),
          });
          break;
        case "search":
          this.search = "";
          break;
      }
      this.performFilter();
    },

    /**
     * @description Loads the question from server and opens the dialog
     */
    async openQuestionDialog(question_id) {
      if (!this.has_user) {
        this.$notification.warning(
          `Want to see more? Login to get the full experience!`,
        );
        return;
      }

      try {
        this.SET_LOADING({ data: true });
        await this.GET_QUESTION({ question_id });
        this.open_dialog = true;
      } catch (err) {
        console.error(err);
        this.$notification.error(
          `Encountered error retrieving question: ${err}`,
        );
      } finally {
        this.SET_LOADING({ data: false });
      }
    },
  },
};
</script>
