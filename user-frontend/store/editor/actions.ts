import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { EditorState } from "./index";
import { RootState } from "../index";
import axios from "axios";

const actions: ActionTree<EditorState, RootState> = {
  /**
   * @description to get editors
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_EDITORS]({ commit }) {
    const { data: editors } = await this.$axios.$get(`/editor/api`);
    commit(MutationTypes.SET_EDITORS, { data: editors });
    return editors;
  },
  /**
   * @description to get editor by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_EDITOR]({ commit }, { editor_id }) {
    const { data: editor } = await this.$axios.$get(`/editor/api/${editor_id}`);
    commit(MutationTypes.SET_EDITOR, { data: editor });
    return editor;
  },
  /**
   * @description to create editor
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_EDITOR]({ commit }, { editor }) {
    const { data: created_editor } = await this.$axios.$post(
      `/api/editor`,
      editor,
    );
    return created_editor;
  },
  /**
   * @description execute user's code
   * @param param0
   * @param param1
   */
  async [ActionTypes.EXECUTE_CODE]({ commit }, params = {}) {
    try {
      const URL = "https://codexweb.netlify.app/.netlify/functions/enforceCode";
      const programming_language = _.get(params, "programming_language");
      const data = _.get(params, "content");

      let language;
      switch (programming_language) {
        case "cpp":
          language = "cpp";
          break;
        case "python":
          language = "py";
          break;
        case "java":
          language = "java";
          break;
      }
      const result = await axios.post(URL, {
        data,
        language,
      });
      console.log(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
