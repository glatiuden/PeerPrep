import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { QuestionState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<QuestionState, RootState> = {
  /**
   * @description to get questions
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_QUESTIONS_PAGINATED]({ commit }, params = {}) {
    const { pagination, data: questions } = await this.$axios.$get(
      `/question/api`,
      { params },
    );
    commit(MutationTypes.SET_QUESTIONS, { data: questions });
    commit(MutationTypes.SET_QUESTIONS_PAGINATION, { data: pagination });
    return questions;
  },
  /**
   * @description to get question by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_QUESTION]({ commit }, { question_id }) {
    const { data: question } = await this.$axios.$get(
      `/question/api/${question_id}`,
    );
    commit(MutationTypes.SET_QUESTION, { data: question });
    return question;
  },
  /**
   * @description to get question by topics
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_QUESTION_TOPICS]({ commit }) {
    const { data: topics } = await this.$axios.$get(`/question/api/topic`);
    commit(MutationTypes.SET_QUESTION_TOPICS, { data: topics });
    return topics;
  },
};

export default actions;
