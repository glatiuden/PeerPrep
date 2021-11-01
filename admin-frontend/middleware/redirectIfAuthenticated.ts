import { Middleware } from "@nuxt/types";

/**
 * If the user is authenticated, bring user to home page
 * @param Context
 */
const redirectIfAuthenticated: Middleware = async ({ store, redirect }) => {
  // Already logged in
  if (store.state.auth.has_admin) {
    return redirect("/");
  }

  // State changed but has login token
  const login_token = localStorage.getItem("login_token");
  const has_login_token =
    login_token !== "undefined" && login_token !== "null" && !!login_token;
  if (has_login_token) {
    await store.dispatch("auth/AUTH");
  }
};

export default redirectIfAuthenticated;
