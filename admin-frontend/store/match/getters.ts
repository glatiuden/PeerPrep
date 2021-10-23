import _ from "lodash";
import { GetterTree } from "vuex";
import { MatchState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<MatchState, RootState> = {
  match: (state) => state.match,
  matches: (state) => state.matches,
  matches_pagination: (state) => state.matches_pagination,
  loading: (state) => state.loading,
  match_id: (state) => state.match_id,
};

export default getters;
