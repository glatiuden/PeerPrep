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
};

export default mutations;
