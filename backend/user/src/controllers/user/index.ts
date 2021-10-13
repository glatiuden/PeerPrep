import createUserController from "./create-user";
import loginUserController from "./login-user";
import getUsersController from "./get-users";
import getUserController from "./get-user";
import updateUserController from "./update-user";
import deleteUserController from "./delete-user";
import hardDeleteUserController from "./hard-delete-user";
import deleteAllUsersController from "./reset-users";

const userController = Object.freeze({
  createUserController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  deleteAllUsersController,
  updateUserController,
  loginUserController,
});

export default userController;

export {
  createUserController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  deleteAllUsersController,
  updateUserController,
  loginUserController,
};
