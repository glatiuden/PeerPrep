import createUserController from "./create-user";
import getUsersController from "./get-users";
import getUserController from "./get-user";
import updateUserController from "./update-user";
import deleteUserController from "./delete-user";
import hardDeleteUserController from "./hard-delete-user";
import resetUsersController from "./reset-users";

const userController = Object.freeze({
  createUserController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  resetUsersController,
  updateUserController,
});

export default userController;

export {
  createUserController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  resetUsersController,
  updateUserController,
};
