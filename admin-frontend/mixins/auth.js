import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "auth/loading",
      admin: "auth/admin",
      has_admin: "auth/has_admin",
    }),
  },

  methods: {
    ...mapActions({
      GET_ADMIN: "auth/GET_ADMIN",
      LOGIN: "auth/LOGIN",
      LOGOUT: "auth/LOGOUT",
      AUTH: "auth/AUTH",
    }),

    ...mapMutations({
      SET_LOADING: "auth/SET_LOADING",
      SET_ADMIN: "auth/SET_ADMIN",
    }),

    getAvatarName({ display_name = "", email = "" } = {}) {
      return `${display_name}`.trim() || email;
    },
  },
};
