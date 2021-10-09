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
  updateUserController
} from "../controllers"

const userRouter = express.Router();

userRouter.post("/", makeExpressCallback(createUserController));
userRouter.post("/admin", makeExpressCallback(createAdminController));

userRouter.get("/", makeExpressCallback(getUsersController));
userRouter.get("/:user_id", makeExpressCallback(getUserController));

userRouter.delete("/:user_id", makeExpressCallback(deleteUserController));
userRouter.delete("/hard-delete/:user_id", makeExpressCallback(hardDeleteUserController));
userRouter.delete("/reset", makeExpressCallback(deleteAllUsersController));

userRouter.put("/:user_id", makeExpressCallback(updateUserController))

export default userRouter;