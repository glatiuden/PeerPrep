import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { UserState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<UserState, RootState> = {
  async [ActionTypes.GET_USERS]({ commit }) {
    const { data: users } = await this.$axios.$get(`/user/admin/user`);
    commit(MutationTypes.SET_USERS, { data: users });
    return users;
  },

  /**
   * @description to get user by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_USER]({ commit }, { user_id }) {
    const { data: user } = await this.$axios.$get(
      `/user/admin/user/${user_id}`,
    );
    commit(MutationTypes.SET_USER, { data: user });
    return user;
  },

  /**
   * @description to create user
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_USER]({ commit }, { user }) {
    const { data: created_user } = await this.$axios.$post(
      `/user/admin/user`,
      user,
    );
    return created_user;
  },

  /**
   * @description to create admin
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_ADMIN]({ commit }, { admin }) {
    const { data: created_admin } = await this.$axios.$post(
      `/user/admin/admin`,
      admin,
    );
    return created_admin;
  },

  /**
   * @description to delete user
   * @param param0
   * @param param1
   */
  async [ActionTypes.DELETE_USER]({ commit }, { user_id }) {
    const { data: deleted_user } = await this.$axios.$delete(
      `/user/admin/user/${user_id}`,
    );
    return deleted_user;
  },

  /**
   * @description to update user
   * @param param0
   * @param param1
   */
  async [ActionTypes.UPDATE_USER]({ commit }, { user }) {
    const { data: updated_user } = await this.$axios.$put(
      `/user/admin/user`,
      user,
    );
    return updated_user;
  },
};

export default actions;
