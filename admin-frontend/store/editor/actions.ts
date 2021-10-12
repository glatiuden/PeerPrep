import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { EditorState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<EditorState, RootState> = {
  async [ActionTypes.GET_EDITORS]({ commit }) {
    const { data: editors } = await this.$axios.$get(`/admin/editor/`);
    commit(MutationTypes.SET_EDITORS, { data: editors });
    return editors;
  },

  /**
   * @description to get editors
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_EDITORS_PAGINATED]({ commit }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);

    let url_query = `?page=${page}`;
    if (query) {
      url_query += `&query=${query}`;
    }

    const { data: editors, pagination } = await this.$axios.$get(
      `/admin/editor/paginated${url_query}`,
    );

    commit(MutationTypes.SET_EDITORS, { data: editors });
    commit(MutationTypes.SET_EDITORS_PAGINATION, {
      data: pagination,
    });

    return editors;
  },
  /**
   * @description to get editor by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_EDITOR]({ commit }, { editor_id }) {
    const { data: editor } = await this.$axios.$get(
      `/admin/editor/${editor_id}`,
    );
    commit(MutationTypes.SET_EDITOR, { data: editor });
    return editor;
  },
  /**
   * @description to delete editor
   * @param param0
   * @param param1
   */
  async [ActionTypes.DELETE_EDITOR]({ commit }, { editor_id }) {
    const { data: deleted_editor } = await this.$axios.$delete(
      `/admin/editor/${editor_id}`,
    );
    return deleted_editor;
  },
  // /**
  //  * @description to update editor
  //  * @param param0
  //  * @param param1
  //  */
  // async [ActionTypes.UPDATE_EDITOR]({ commit }, { editor }) {
  //   const { data: updated_editor } = await this.$axios.$put(
  //     `/admin/editor`,
  //     editor,
  //   );
  //   return updated_editor;
  // },
};

export default actions;
