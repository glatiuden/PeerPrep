import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      loading: "editor/loading",
      editor: "editor/editor",
      editors: "editor/editors",
      editors_pagination: "editor/editors_pagination",
    }),
  },

  methods: {
    ...mapActions({
      GET_EDITORS: "editor/GET_EDITORS",
      GET_EDITORS_PAGINATED: "editor/GET_EDITORS_PAGINATED",
      GET_EDITOR: "editor/GET_EDITOR",
      CREATE_EDITOR: "editor/CREATE_EDITOR",
      DELETE_EDITOR: "editor/DELETE_EDITOR",
    }),

    ...mapMutations({
      SET_LOADING: "editor/SET_LOADING",
      SET_OPEN_DIALOG: "editor/SET_OPEN_DIALOG",
      SET_EDITOR: "editor/SET_EDITOR",
      SET_EDITOR_ID: "editor/SET_EDITOR_ID",
    }),
  },
};
