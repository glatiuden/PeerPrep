import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "question/loading",
      question: "question/question",
      questions: "question/questions",
    }),
  },

  methods: {
    ...mapActions({
      GET_QUESTIONS: "question/GET_QUESTIONS",
      GET_QUESTION: "question/GET_QUESTION",
    }),

    ...mapMutations({
      SET_LOADING: "question/SET_LOADING",
      SET_OPEN_DIALOG: "question/SET_OPEN_DIALOG",
    }),
  },
};
