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
  /**
   * @description to set questions pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_QUESTIONS_PAGINATION](
    state,
    {
      data,
    }: {
      data: {
        current_page: number;
        from: null | number;
        to: null | number;
        per_page: number;
        total: number;
      };
    },
  ) {
    state.questions_pagination = data;
  },
  /**
   * @description to set question topics
   * @param state
   * @param param1
   */
  [MutationTypes.SET_QUESTION_TOPICS](state, { data }: { data: any[] }) {
    state.question_topics = data;
  },
  /**
   * @description to set selected topics
   * @param state
   * @param param1
   */
  [MutationTypes.SET_SELECTED_TOPICS](state, { data }: { data: any[] }) {
    state.selected_topics = data;
  },
};

export default mutations;
