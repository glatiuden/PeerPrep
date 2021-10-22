import createUserController from "./create-user";
import loginUserController from "./login-user";
import getUserController from "./get-user";
import updateUserController from "./update-user";
import getUserByEmailController from "./get-user-by-email";

const userController = Object.freeze({
  createUserController,
  getUserController,
  updateUserController,
  loginUserController,
  getUserByEmailController,
});

export default userController;

export { createUserController, getUserController, updateUserController, loginUserController, getUserByEmailController };
