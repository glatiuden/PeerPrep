import _ from "lodash";
import { GetterTree } from "vuex";
import { QuestionState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<QuestionState, RootState> = {
  loading: (state) => state.loading,
  question: (state) => state.question,
  questions: (state) => state.questions,
  questions_pagination: (state) => state.questions_pagination,
  question_topics: (state) => state.question_topics,
  difficulty_levels: (state) => state.difficulty_levels,
  selected_topics: (state) => state.selected_topics,
};

export default getters;
