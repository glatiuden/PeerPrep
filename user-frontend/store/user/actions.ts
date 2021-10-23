import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { UserState } from "./index";
import { RootState } from "../index";
import axios from "axios";

const actions: ActionTree<UserState, RootState> = {
  /**
   * @description login as user
   * @param param0
   * @param param1
   */
  async [ActionTypes.LOGIN_USER](
    { commit },
    { email, password }: { email: string; password: string },
  ) {
    const { login_token, data: user } = await this.$axios.$post(
      "/user/api/login",
      {
        email,
        password,
      },
    );

    localStorage.setItem("login_token", login_token);
    commit(MutationTypes.SET_USER, { data: user });
    if (user && login_token) {
      commit(MutationTypes.SET_HAS_USER, { data: true });
    }
    return { login_token, user };
  },

  /**
   * @description to get user by id
   * @param param0
   * @param param1
   */
  async [ActionTypes.GET_USER]({ commit }, { user_id }) {
    const { data: user } = await this.$axios.$get(`/user/api/${user_id}`);
    return user;
  },
  /**
   * @description to create user
   * @param param0
   * @param param1
   */
  async [ActionTypes.CREATE_USER]({ commit }, { user }) {
    const { data: created_user } = await this.$axios.$post(`/user/api/`, user);
    return created_user;
  },
  /**
   * @description check if user token is valid
   * @param param0
   */
  async [ActionTypes.AUTH_USER]({ commit }) {
    const { data: user } = await this.$axios.$get("/user/api/auth/");

    if (!user) {
      localStorage.removeItem("login_token");
      commit(MutationTypes.SET_HAS_USER, { data: false });
      throw new Error("User is not valid");
    }

    commit(MutationTypes.SET_USER, { data: user });
    commit(MutationTypes.SET_HAS_USER, { data: true });
    return user;
  },

  async [ActionTypes.LOGOUT_USER]({ commit, state }) {
    try {
      const login_token = localStorage.getItem("login_token");
      if (!login_token) {
        return;
      }
      await this.$axios.$post(`/user/api/logout`, { email: state.user.email });

      localStorage.removeItem("login_token");
      commit(MutationTypes.SET_USER, { data: null });
      commit(MutationTypes.SET_HAS_USER, { data: false });

      const origin = `${window.location.origin}/login`;
      window.location.replace(origin);
    } catch (err: any) {
      const error = err && err.message ? `?errorMessage=${err.message}` : "";
      const origin = `${window.location.origin}/login${error}`;
      window.location.replace(origin);
    }
  },
};

export default actions;
