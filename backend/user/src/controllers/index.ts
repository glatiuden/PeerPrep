import createUserController from "./create-user";
import getUsersController from "./get-users";
import getUserController from "./get-user";
import createAdminController from "./create-admin";
import updateUserController from "./update-user";
import deleteUserController from "./delete-user";
import hardDeleteUserController from "./hard-delete-user";
import deleteAllUsersController from "./reset-users";
import loginUserController from "./login-user";

const chatController = Object.freeze({
  createUserController,
  createAdminController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  deleteAllUsersController,
  updateUserController,
  loginUserController,
});

export default chatController;

export {
  createUserController,
  createAdminController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  deleteAllUsersController,
  updateUserController,
  loginUserController,
};
