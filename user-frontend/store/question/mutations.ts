import _ from "lodash";
import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { QuestionState } from "./index";

const mutations: MutationTree<QuestionState> = {
  /**
   * @description to set loading
   * @param state
   * @param param1
   */
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
  /**
   * @description to set the selected question
   * @param state
   * @param param1
   */
  [MutationTypes.SET_QUESTION](state, { data }: { data: any }) {
    state.question = data;
  },
  /**
   * @description to set questions
   * @param state
   * @param param1
   */
  [MutationTypes.SET_QUESTIONS](state, { data }: { data: any[] }) {
    state.questions = data;
  },
};

export default mutations;
