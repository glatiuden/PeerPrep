import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      elo_rankings: [
        { elo: 0, text: "Unranked" },
        {
          elo: 1000,
          text: "Novice",
        },
        {
          elo: 2000,
          text: "Competent",
        },
        {
          elo: 3000,
          text: "Expert",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      loading: "user/loading",
      user: "user/user",
      has_user: "user/has_user",
    }),

    user_id() {
      return _.get(this.user, "_id");
    },
  },

  methods: {
    ...mapActions({
      GET_USER: "user/GET_USER",
      CREATE_USER: "user/CREATE_USER",
      LOGIN_USER: "user/LOGIN_USER",
      AUTH_USER: "user/AUTH_USER",
      LOGOUT_USER: "user/LOGOUT_USER",
    }),

    ...mapMutations({
      SET_LOADING: "user/SET_LOADING",
    }),

    getAvatarName({ display_name = "", email = "" } = {}) {
      return `${display_name}`.trim() || email;
    },
  },
};
