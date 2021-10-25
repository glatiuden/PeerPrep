import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "user/loading",
      user: "user/user",
      users: "user/users",
      users_pagination: "user/users_pagination",
    }),
  },

  methods: {
    ...mapActions({
      GET_USERS: "user/GET_USERS",
      GET_USERS_PAGINATED: "user/GET_USERS_PAGINATED",
      GET_USER: "user/GET_USER",
      CREATE_USER: "user/CREATE_USER",
      CREATE_ADMIN: "user/CREATE_ADMIN",
      DELETE_USER: "user/DELETE_USER",
      UPDATE_USER: "user/UPDATE_USER",
    }),

    ...mapMutations({
      SET_LOADING: "user/SET_LOADING",
      SET_OPEN_DIALOG: "user/SET_OPEN_DIALOG",
      SET_USER: "user/SET_USER",
      SET_USER_ID: "user/SET_USER_ID",
    }),
  },
};
