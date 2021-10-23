import _ from "lodash";
import { GetterTree } from "vuex";
import { MatchState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<MatchState, RootState> = {
  loading: (state) => state.loading,
  open_matching_dialog: (state) => state.open_matching_dialog,
  match: (state) => state.match,
  matches: (state) => state.matches,
};

export default getters;
