import _ from "lodash";
import { GetterTree } from "vuex";
import { UserState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<UserState, RootState> = {
  loading: (state) => state.loading,
  user: (state) => state.user,
  has_user: (state) => state.has_user,
};

export default getters;
