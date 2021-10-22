import _ from "lodash";
import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { UserState } from "./index";

const mutations: MutationTree<UserState> = {
  /**
   * @description to set loading
   * @param state
   * @param param1
   */
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
  /**
   * @description to set user
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USER](state, { data }: { data: any }) {
    state.user = data;
  },
  /**
   * @description to set has user for authentication purpose
   * @param state
   * @param param1
   */
  [MutationTypes.SET_HAS_USER](state, { data }: { data: boolean }) {
    state.has_user = data;
  },
};

export default mutations;
