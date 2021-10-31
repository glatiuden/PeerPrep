import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "question/loading",
      question: "question/question",
      questions: "question/questions",
      questions_pagination: "question/questions_pagination",
      question_topics: "question/question_topics",
      difficulty_levels: "question/difficulty_levels",
      selected_topics: "question/selected_topics",
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
      SET_SELECTED_TOPICS: "question/SET_SELECTED_TOPICS",
    }),
  },
};