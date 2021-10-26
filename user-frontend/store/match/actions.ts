import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { MatchState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<MatchState, RootState> = {
  /**
   * @description to get matches
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_MATCHES]({ commit }, params = {}) {
    const user_id = _.get(params, "user_id");
    delete params["user_id"];

    const { data: matches, pagination } = await this.$axios.$get(
      `/match/api/user/${user_id}`,
      { params },
    );
    commit(MutationTypes.SET_MATCHES, { data: matches });
    commit(MutationTypes.SET_MATCHES_PAGINATION, { data: pagination });
    return matches;
  },
  /**
   * @description to get match by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_MATCH]({ commit }, { match_id }) {
    const { data: match } = await this.$axios.$get(`/match/api/${match_id}`);
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
      `/match/api`,
      match,
    );
    return created_match;
  },

  /**
   * @description to update match
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_MATCH]({ commit }, { match }) {
    const { data: updated_match } = await this.$axios.$put(`/match/api`, match);
    return updated_match;
  },

  /**
   * @description to end match
   * @param param0
   * @param param1
   */
  async [ActionTypes.END_MATCH]({ commit, dispatch, state }, { match_id }) {
    const { data: is_completed } = await this.$axios.$put(`/match/api/end`, {
      match_id,
    });

    if (is_completed) {
      dispatch(
        "$nuxtSocket/emit",
        {
          label: "editor",
          evt: "end_session",
          msg: {
            match_id,
            content: state.codes,
          },
        },
        { root: true },
      );
      dispatch(
        "$nuxtSocket/emit",
        {
          label: "chat",
          evt: "end_session",
          msg: {
            match_id,
            content: state.chat_messages,
          },
        },
        { root: true },
      );
    }
    return is_completed;
  },
};

export default actions;
