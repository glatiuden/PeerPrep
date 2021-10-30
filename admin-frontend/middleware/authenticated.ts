import { Middleware } from "@nuxt/types";
import _ from "lodash";

/**
 * @description If the admin is not authenticated, redirect back to login
 * @param param0
 */
const authenticated: Middleware = async ({ store }) => {
  try {
    await store.dispatch("auth/AUTH");
  } catch (err) {
    console.error(err);
    localStorage.removeItem("login_token");
    await store.dispatch("auth/LOGOUT");
  }
};

export default authenticated;
