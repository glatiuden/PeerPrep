import express from "express";
import makeExpressCallback from "../../express-callback";
import {
  createUserController,
  getUserController,
  getUsersController,
  deleteUserController,
  hardDeleteUserController,
  resetUsersController,
  updateUserController,
} from "../../controllers/admin/user";

// TODO: Use for all admin routes.
import tokenValidatorMiddleware from "../../middleware/token-validator-middleware";

const userRouter = express.Router();

userRouter.post("/", makeExpressCallback(createUserController));

userRouter.get("/", makeExpressCallback(getUsersController));
userRouter.get("/:user_id", makeExpressCallback(getUserController));

userRouter.delete("/reset", makeExpressCallback(resetUsersController));
userRouter.delete("/:user_id", makeExpressCallback(deleteUserController));
userRouter.delete("/hard-delete/:user_id", makeExpressCallback(hardDeleteUserController));

userRouter.put("/", makeExpressCallback(updateUserController));

export default userRouter;
