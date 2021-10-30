import _ from "lodash";
import { MutationTypes } from "./mutation-type";
import { MutationTree } from "vuex";
import { AuthState } from "./index";

const mutations: MutationTree<AuthState> = {
  /**
   * @description to set loading
   * @param state
   * @param param1
   */
  [MutationTypes.SET_LOADING](state, { data }: { data: boolean }) {
    state.loading = data;
  },
  /**
   * @description to set admin
   * @param state
   * @param param1
   */
  [MutationTypes.SET_ADMIN](state, { data }: { data: any }) {
    state.admin = data;
  },
  /**
   * @description to set has admin for authentication purpose
   * @param state
   * @param param1
   */
  [MutationTypes.SET_HAS_ADMIN](state, { data }: { data: boolean }) {
    state.has_admin = data;
  },
};

export default mutations;
