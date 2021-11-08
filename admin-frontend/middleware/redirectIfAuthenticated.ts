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
};

export default redirectIfAuthenticated;
