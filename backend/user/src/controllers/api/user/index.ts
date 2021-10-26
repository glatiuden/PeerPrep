import createUserController from "./create-user";
import loginUserController from "./login-user";
import getUserController from "./get-user";
import updateUserController from "./update-user";
import getUserByEmailController from "./get-user-by-email";
import logoutUserController from "./logout-user";
import updateUserEloController from "./update-user-elo";

const userController = Object.freeze({
  createUserController,
  getUserController,
  updateUserController,
  loginUserController,
  getUserByEmailController,
  logoutUserController,
  updateUserEloController,
});

export default userController;

export {
  createUserController,
  getUserController,
  updateUserController,
  loginUserController,
  getUserByEmailController,
  logoutUserController,
  updateUserEloController,
};
