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
   * @description to set the selected user
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USER](state, { data }: { data: any }) {
    state.user = data;
  },
  /**
   * @description to set users
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USERS](state, { data }: { data: any[] }) {
    state.users = data;
  },
  /**
   * @description to set users pagination
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USERS_PAGINATION](
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
    state.users_pagination = data;
  },
  /**
   * @description to set user ID
   * @param state
   * @param param1
   */
  [MutationTypes.SET_USER_ID](state, { data }: { data: string }) {
    state.user_id = data;
  },
};

export default mutations;
