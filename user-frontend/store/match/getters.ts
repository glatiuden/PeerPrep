import _ from "lodash";
import { GetterTree } from "vuex";
import { MatchState } from "./index";
import { RootState } from "../index";

export const getters: GetterTree<MatchState, RootState> = {
  loading: (state) => state.loading,
  open_matching_dialog: (state) => state.open_matching_dialog,
  open_elo_match_dialog: (state) => state.open_elo_match_dialog,
  match: (state) => state.match,
  matches: (state) => state.matches,
  matches_pagination: (state) => state.matches_pagination,
  chat_messages: (state) => state.chat_messages,
  codes: (state) => state.codes,
};

export default getters;
