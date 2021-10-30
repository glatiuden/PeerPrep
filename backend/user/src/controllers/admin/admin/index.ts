import createAdminController from "./create-admin";
import loginAdminController from "./login-admin";
import logoutAdminContorller from "./logout-admin";
import getAdminController from "./get-admin";

const adminController = Object.freeze({
  createAdminController,
  loginAdminController,
  logoutAdminContorller,
  getAdminController,
});

export default adminController;

export { createAdminController, loginAdminController, logoutAdminContorller, getAdminController };
