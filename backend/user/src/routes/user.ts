import express from "express";
import makeExpressCallback from "../express-callback";
import {
  createAdminController,
  createUserController,
  getUserController,
  getUsersController,
  deleteUserController,
  hardDeleteUserController,
  deleteAllUsersController,
  updateUserController,
  loginUserController
} from "../controllers"

// import makeValidator from "../middleware/validator-middleware";
// import { createUserRules } from "../controllers/validators";

const userRouter = express.Router();

userRouter.post("/", makeExpressCallback(createUserController));
userRouter.post("/admin", makeExpressCallback(createAdminController));
userRouter.post('/login', makeExpressCallback(loginUserController))

userRouter.get("/", makeExpressCallback(getUsersController));
userRouter.get("/:user_id", makeExpressCallback(getUserController));

userRouter.delete("/reset", makeExpressCallback(deleteAllUsersController));
userRouter.delete("/:user_id", makeExpressCallback(deleteUserController));
userRouter.delete("/hard-delete/:user_id", makeExpressCallback(hardDeleteUserController));

userRouter.put("/:user_id", makeExpressCallback(updateUserController))

export default userRouter;