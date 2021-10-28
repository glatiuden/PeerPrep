import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "match/loading",
      match: "match/match",
      matches: "match/matches",
      matches_pagination: "match/matches_pagination",
      chat_messages: "match/chat_messages",
      codes: "match/codes",
      open_matching_dialog: "match/open_matching_dialog",
    }),
  },

  methods: {
    ...mapActions({
      CREATE_MATCH: "match/CREATE_MATCH",
      GET_MATCH: "match/GET_MATCH",
      GET_MATCHES: "match/GET_MATCHES",
      UPDATE_CODES: "match/UPDATE_CODES",
      END_MATCH: "match/END_MATCH",
      GET_CHAT: "match/GET_CHAT",
      GET_EDITOR: "match/GET_EDITOR",
      EXECUTE_CODE: "match/EXECUTE_CODE",
    }),

    ...mapMutations({
      SET_LOADING: "match/SET_LOADING",
      SET_OPEN_MATCHING_DIALOG: "match/SET_OPEN_MATCHING_DIALOG",
      SET_OPEN_ELO_MATCH_DIALOG: "match/SET_OPEN_ELO_MATCH_DIALOG",
      SET_MATCH: "match/SET_MATCH",
      UPDATE_CHAT_MESSAGES: "match/UPDATE_CHAT_MESSAGES",
      SET_CHAT_MESSAGES: "match/SET_CHAT_MESSAGES",
    }),
  },
};
