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
      `/question/admin`,
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
      `/question/admin/${question_id}`,
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
    const { data: topics } = await this.$axios.$get(`/question/admin/topic`);
    commit(MutationTypes.SET_QUESTION_TOPICS, { data: topics });
    return topics;
  },
  /**
   * @description to delete an existing question
   * @param param0
   * @param param1
   */
  async [ActionTypes.DELETE_QUESTION]({ commit }, { question_id }) {
    const { data: deleted_question } = await this.$axios.$delete(`/question/admin/${question_id}`);
    return deleted_question;
  },
  /**
   * @description to create a new question
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_QUESTION]({ commit }, { question }) {
    const { data: created_question } = await this.$axios.$post(
      `/question/admin`,
      question,
    );
    return created_question;
  },

  /**
   * @description to update ab existing question
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_QUESTION]({ commit }, { question }) {
    const { data: updated_question } = await this.$axios.$put(`/question/admin`, question);
    return updated_question;
  },
};

export default actions;
