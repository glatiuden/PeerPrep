import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "match/loading",
      open_matching_dialog: "match/open_matching_dialog",
      match: "match/match",
      matches: "match/matches",
    }),
  },

  methods: {
    ...mapActions({
      GET_MATCHES_BY_USER_ID: "match/GET_MATCHES_BY_USER_ID",
      GET_MATCH: "match/GET_MATCH",
      CREATE_MATCH: "match/CREATE_MATCH",
    }),

    ...mapMutations({
      SET_LOADING: "match/SET_LOADING",
      SET_OPEN_MATCHING_DIALOG: "match/SET_OPEN_MATCHING_DIALOG",
      SET_MATCH: "match/SET_MATCH",
    }),
  },
};
