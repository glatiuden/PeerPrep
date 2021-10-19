import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { EditorState } from "./index";
import { RootState } from "../index";

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

  // These methods are not used, only used for reference. If your service needs such method, copy and uncomment in your own file.
  // /**
  //  * @description to update editor
  //  * @param param0
  //  * @param param1
  //  */
  // async [ActionTypes.UPDATE_EDITOR]({ commit }, { editor }) {
  //   const { data: updated_editor } = await this.$axios.$put(
  //     `/api/editor`,
  //     editor,
  //   );
  //   return updated_editor;
  // },
  // /**
  //  * @description to delete editor
  //  * @param param0
  //  * @param param1
  //  */
  // async [ActionTypes.DELETE_EDITOR]({ commit }, { editor_id }) {
  //   const { data: deleted_editor } = await this.$axios.$delete(
  //     `/api/editor/${editor_id}`,
  //   );
  //   return deleted_editor;
  // },
};

export default actions;
