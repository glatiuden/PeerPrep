import { ActionTree, MutationTree, GetterTree } from "vuex";

export const state = () => ({
  show_drawer: true,
});

export type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {};

export const getters: GetterTree<RootState, RootState> = {
  show_drawer: (state) => state.show_drawer,
};

export const mutations: MutationTree<RootState> = {
  /**
   * @description to set show drawer variable
   * @param state
   * @param param1
   */
  SET_SHOW_DRAWER(state, { data }: { data: boolean }) {
    state.show_drawer = data;
  },
};
