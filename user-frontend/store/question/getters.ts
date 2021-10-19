import _ from "lodash";
import { GetterTree } from "vuex";
import { QuestionState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<QuestionState, RootState> = {
  question: (state) => state.question,
  questions: (state) => state.questions,
  loading: (state) => state.loading,
};

export default getters;
