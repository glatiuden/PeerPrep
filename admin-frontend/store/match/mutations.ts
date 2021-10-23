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
   * @description to set matches
   * @param state
   * @param param1
   */
  [MutationTypes.SET_MATCHES](state, { data }: { data: any[] }) {
    state.matches = data;
  },
  /**
   * @description to set matches pagination
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
   * @description to set match ID
   * @param state
   * @param param1
   */
  [MutationTypes.SET_MATCH_ID](state, { data }: { data: string }) {
    state.match_id = data;
  },
};

export default mutations;
