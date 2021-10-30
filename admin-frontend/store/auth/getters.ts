import _ from "lodash";
import { GetterTree } from "vuex";
import { AuthState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<AuthState, RootState> = {
  loading: (state) => state.loading,
  admin: (state) => state.admin,
  has_admin: (state) => state.has_admin,
};

export default getters;
