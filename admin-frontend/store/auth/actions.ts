import _ from "lodash";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-type";
import { MutationTypes } from "./mutation-type";
import { AuthState } from "./index";
import { RootState } from "../index";

const actions: ActionTree<AuthState, RootState> = {
  /**
   * @description login as user
   * @param param0
   * @param param1
   */
  async [ActionTypes.LOGIN](
    { commit },
    { email, password }: { email: string; password: string },
  ) {
    const { login_token, data: user } = await this.$axios.$post(
      "/user/admin/admin/login",
      {
        email,
        password,
      },
    );

    localStorage.setItem("login_token", login_token);
    commit(MutationTypes.SET_ADMIN, { data: user });
    if (user && login_token) {
      console.log("ok");
      commit(MutationTypes.SET_HAS_ADMIN, { data: true });
    }
    return { login_token, user };
  },

  /**
   * @description check if user token is valid
   * @param param0
   */
  async [ActionTypes.AUTH]({ commit }) {
    try {
      const { data: user } = await this.$axios.$get("/user/admin/admin/auth/");

      if (!user) {
        localStorage.removeItem("login_token");
        commit(MutationTypes.SET_HAS_ADMIN, { data: false });
        throw new Error("User is not valid");
      }

      commit(MutationTypes.SET_ADMIN, { data: user });
      commit(MutationTypes.SET_HAS_ADMIN, { data: true });
      return user;
    } catch (err: any) {
      const origin = `${window.location.origin}/login`;
      window.location.replace(origin);
    }
  },

  async [ActionTypes.LOGOUT]({ commit, state }) {
    try {
      const login_token = localStorage.getItem("login_token");
      if (!login_token) {
        return;
      }
      await this.$axios.$post(`/user/admin/admin/logout`, {
        email: state.admin.email,
      });

      localStorage.removeItem("login_token");
      console.log(localStorage.getItem("login_token"));
      commit(MutationTypes.SET_ADMIN, { data: null });
      commit(MutationTypes.SET_HAS_ADMIN, { data: false });

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
