import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      chip_colors: {
        easy: "green",
        medium: "yellow",
        hard: "red",
      },
    };
  },

  computed: {
    ...mapGetters({
      loading: "question/loading",
      question: "question/question",
      questions: "question/questions",
      questions_pagination: "question/questions_pagination",
      question_topics: "question/question_topics",
      difficulty_levels: "question/difficulty_levels",
    }),
  },

  methods: {
    ...mapActions({
      GET_QUESTIONS_PAGINATED: "question/GET_QUESTIONS_PAGINATED",
      GET_QUESTION: "question/GET_QUESTION",
      GET_QUESTION_TOPICS: "question/GET_QUESTION_TOPICS",
    }),

    ...mapMutations({
      SET_LOADING: "question/SET_LOADING",
    }),
  },
};
