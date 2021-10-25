import _ from "lodash";
import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { MatchState } from "./index";
import * as Y from "yjs";

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
   * @description to set matchs
   * @param state
   * @param param1
   */
  [MutationTypes.SET_MATCHES](state, { data }: { data: any[] }) {
    state.matches = data;
  },
  /**
   * @description to set matchs
   * @param state
   * @param param1
   */
  [MutationTypes.UPDATE_CHAT_MESSAGES](state, { data }: { data: any }) {
    state.chat_messages = _.concat(state.chat_messages, [data]);
  },
  /**
   * @description to set matchs
   * @param state
   * @param param1
   */
  [MutationTypes.UPDATE_CODES](state, { data }: { data: any }) {
    state.codes = data;
  },
};

export default mutations;
