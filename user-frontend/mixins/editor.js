import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "editor/loading",
      editor: "editor/editor",
      editors: "editor/editors",
    }),
  },

  methods: {
    ...mapActions({
      GET_EDITORS: "editor/GET_EDITORS",
      GET_EDITOR: "editor/GET_EDITOR",
      CREATE_EDITOR: "editor/CREATE_EDITOR",
      EXECUTE_CODE: "editor/EXECUTE_CODE",
    }),

    ...mapMutations({
      SET_LOADING: "editor/SET_LOADING",
      SET_OPEN_DIALOG: "editor/SET_OPEN_DIALOG",
      SET_EDITOR: "editor/SET_EDITOR",
    }),
  },
};
