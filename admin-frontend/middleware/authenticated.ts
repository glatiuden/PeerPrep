import { Middleware } from "@nuxt/types";
import _ from "lodash";

/**
 * @description If the user is not authenticated, redirect back to login
 * @param param0
 */
const authenticated: Middleware = async ({ store }) => {
  try {
    const user = store.getters["auth/user"];
    const login_token = localStorage.getItem("login_token");
    const has_login_token =
      login_token !== "undefined" && login_token !== "null" && !!login_token;
    const need_to_fetch = _.isEmpty(user) && has_login_token;
    if (need_to_fetch) {
      await store.dispatch("auth/AUTH");
    }
  } catch (err) {
    console.error(err);
    localStorage.removeItem("login_token");
    await store.dispatch("auth/LOGOUT");
  }
};

export default authenticated;
