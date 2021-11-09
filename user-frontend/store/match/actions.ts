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
  /**
   * @description to get editor by match id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_EDITOR]({ commit }, { match_id }) {
    const { data: editor } = await this.$axios.$get(
      `/editor/api/match/${match_id}`,
    );
    const content = _.get(editor, "content");
    commit(MutationTypes.UPDATE_CODES, { data: content });
    return editor;
  },
  /**
   * @description to get chat by match id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_CHAT]({ commit }, { match_id }) {
    const { data: chat } = await this.$axios.$get(
      `/chat/api/match/${match_id}`,
    );
    const content = _.get(chat, "content");
    commit(MutationTypes.SET_CHAT_MESSAGES, { data: content });
    return chat;
  },
  /**
   * @description execute user's code
   * @param param0
   * @param param1
   */
  async [ActionTypes.EXECUTE_CODE]({ commit }, params = {}) {
    try {
      const { data: output } = await this.$axios.$post(
        `/editor/api/execute`,
        params,
      );
      return output;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * @description create ratings
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_RATING]({ commit }, params = {}) {
    try {
      const { data: rating } = await this.$axios.$post(
        `/match/api/rating`,
        params,
      );
      return rating;
    } catch (err) {
      console.error(err);
    }
  },
  /**
   * @description get average rating
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_AVERAGE_RATING]({ commit }, { receiver_id }) {
    try {
      const { data: rating } = await this.$axios.$get(
        `/match/api/rating/${receiver_id}`,
      );
      return rating;
    } catch (err) {
      console.error(err);
    }
  },
};

export default actions;
