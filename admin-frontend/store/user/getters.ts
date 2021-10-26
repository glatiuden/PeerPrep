import _ from "lodash";
import { GetterTree } from "vuex";
import { UserState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<UserState, RootState> = {
  user: (state) => state.user,
  users: (state) => state.users,
  users_pagination: (state) => state.users_pagination,
  loading: (state) => state.loading,
  user_id: (state) => state.user_id,
};

export default getters;
