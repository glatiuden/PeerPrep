import createAdminController from "./create-admin";
import loginAdminController from "./login-admin";

const adminController = Object.freeze({
  createAdminController,
  loginAdminController,
});

export default adminController;

export { createAdminController, loginAdminController };
