import _ from "lodash";
import { GetterTree } from "vuex";
import { MatchState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<MatchState, RootState> = {
  loading: (state) => state.loading,
  match: (state) => state.match,
  matches: (state) => state.matches,
};

export default getters;
