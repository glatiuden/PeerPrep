import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { MatchState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<MatchState, RootState> = {
  async [ActionTypes.GET_MATCHES]({ commit }) {
    const { data: matches } = await this.$axios.$get(`/admin/match/`);
    commit(MutationTypes.SET_MATCHES, { data: matches });
    return matches;
  },

  /**
   * @description to get matches
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_MATCHES_PAGINATED]({ commit }, params = {}) {
    const query = _.get(params, "query");
    const page = _.get(params, "page", 1);

    let url_query = `?page=${page}`;
    if (query) {
      url_query += `&query=${query}`;
    }

    const { data: matches, pagination } = await this.$axios.$get(
      `/admin/match/paginated${url_query}`,
    );

    commit(MutationTypes.SET_MATCHES, { data: matches });
    commit(MutationTypes.SET_MATCHES_PAGINATION, {
      data: pagination,
    });

    return matches;
  },
  /**
   * @description to get match by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_MATCH]({ commit }, { match_id }) {
    const { data: match } = await this.$axios.$get(
      `/admin/match/${match_id}`,
    );
    commit(MutationTypes.SET_MATCH, { data: match });
    return match;
  },

  /**
   * @description to create match
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_MATCH]({ commit }, { match }) {
    const { data: created_match } = await this.$axios.$post(
      `/api/match`,
      match,
    );
    return created_match;
  },

  /**
   * @description to delete match
   * @param param0
   * @param param1
   */
  async [ActionTypes.DELETE_MATCH]({ commit }, { match_id }) {
    const { data: deleted_match } = await this.$axios.$delete(
      `/admin/match/${match_id}`,
    );
    return deleted_match;
  },

  /**
   * @description to update match
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_MATCH]({ commit }, { match }) {
    const { data: updated_match } = await this.$axios.$put(
      `/admin/match`,
      match,
    );
    return updated_match;
  },
};

export default actions;
