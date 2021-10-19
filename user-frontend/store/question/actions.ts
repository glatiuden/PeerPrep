import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { QuestionState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<QuestionState, RootState> = {
  /**
   * @description to get editors
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_QUESTIONS]({ commit }) {
    const { data: editors } = await this.$axios.$get(`/editor/api`);
    commit(MutationTypes.SET_QUESTIONS, { data: editors });
    return editors;
  },
  /**
   * @description to get editor by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_QUESTION]({ commit }, { editor_id }) {
    const { data: editor } = await this.$axios.$get(`/editor/api/${editor_id}`);
    commit(MutationTypes.SET_QUESTION, { data: editor });
    return editor;
  },
};

export default actions;
