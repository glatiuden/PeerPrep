import createAdminController from "./create-admin";
import loginAdminController from "./login-admin";

const userController = Object.freeze({
  createAdminController,
  loginAdminController
});

export default userController;

export {
  createAdminController,
  loginAdminController
};
