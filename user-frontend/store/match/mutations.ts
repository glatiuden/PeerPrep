import _ from "lodash";
import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { MatchState } from "./index";

const mutations: MutationTree<MatchState> = {
  /**
   * @description to set loading
   * @param state
   * @param param1
   */
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
  /**
   * @description to set open dialog
   * @param state
   * @param param1
   */
  [MutationTypes.SET_OPEN_MATCHING_DIALOG](state, { data }: { data: boolean }) {
    state.open_matching_dialog = data;
  },
  /**
   * @description to set the selected match
   * @param state
   * @param param1
   */
  [MutationTypes.SET_MATCH](state, { data }: { data: any }) {
    state.match = data;
  },
  /**
   * @description to set matches
   * @param state
   * @param param1
   */
  [MutationTypes.SET_MATCHES](state, { data }: { data: any[] }) {
    state.matches = data;
  },
  /**
   * @description to set questions pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_MATCHES_PAGINATION](
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
    state.matches_pagination = data;
  },
  /**
   * @description to update chat messages
   * @param state
   * @param param1
   */
  [MutationTypes.UPDATE_CHAT_MESSAGES](state, { data }: { data: any }) {
    state.chat_messages = _.concat(state.chat_messages, [data]);
  },
  /**
   * @description to update chat messages
   * @param state
   * @param param1
   */
  [MutationTypes.SET_CHAT_MESSAGES](state, { data }: { data: any[] }) {
    state.chat_messages = data;
  },
  /**
   * @description to update codes
   * @param state
   * @param param1
   */
  [MutationTypes.UPDATE_CODES](state, { data }: { data: any }) {
    state.codes = data;
  },
  /**
   * @description to set open dialog
   * @param state
   * @param param1
   */
  [MutationTypes.SET_OPEN_ELO_MATCH_DIALOG](
    state,
    { data }: { data: boolean },
  ) {
    state.open_elo_match_dialog = data;
  },
};

export default mutations;
