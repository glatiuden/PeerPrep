import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "match/loading",
      match: "match/match",
      matches: "match/matches",
      matches_pagination: "match/matches_pagination",
    }),
  },

  methods: {
    ...mapActions({
      GET_MATCHES: "match/GET_MATCHES",
      GET_MATCHES_PAGINATED: "match/GET_MATCHES_PAGINATED",
      GET_MATCH: "match/GET_MATCH",
      CREATE_MATCH: "match/CREATE_MATCH",
      DELETE_MATCH: "match/DELETE_MATCH",
    }),

    ...mapMutations({
      SET_LOADING: "match/SET_LOADING",
      SET_OPEN_DIALOG: "match/SET_OPEN_DIALOG",
      SET_MATCH: "match/SET_MATCH",
      SET_MATCH_ID: "match/SET_MATCH_ID",
    }),
  },
};
