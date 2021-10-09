import createUserController from "./create-user";
import getUsersController from "./get-users";
import getUserController from "./get-user";
import createAdminController from "./create-admin";
import updateUserController from "./update-user";
import deleteUserController from "./delete-user";
import hardDeleteUserController from "./hard-delete-user";
import deleteAllUsersController from "./reset-users";

const chatController = Object.freeze({
  createUserController,
  createAdminController,
  getUsersController,
  getUserController,
  deleteUserController,
  hardDeleteUserController,
  deleteAllUsersController,
  updateUserController,
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
};
