import express from "express";
import makeExpressCallback from "../../express-callback";
import {
  createUserController,
  getUserController,
  updateUserController,
  loginUserController,
  getUserByEmailController,
  logoutUserController,
  updateUserEloController,
} from "../../controllers/api/user";

import tokenValidatorMiddleware from "../../middleware/token-validator-middleware";

const userRouter = express.Router();

userRouter.post("/", makeExpressCallback(createUserController));
userRouter.post("/login", makeExpressCallback(loginUserController));
userRouter.post("/logout", tokenValidatorMiddleware, makeExpressCallback(logoutUserController));
userRouter.get("/auth", tokenValidatorMiddleware, makeExpressCallback(getUserController));
userRouter.get("/email/:email", tokenValidatorMiddleware, makeExpressCallback(getUserByEmailController));
userRouter.get("/:user_id", tokenValidatorMiddleware, makeExpressCallback(getUserController));
userRouter.put("/elo/:user_id", tokenValidatorMiddleware, makeExpressCallback(updateUserEloController));
userRouter.put("/", tokenValidatorMiddleware, makeExpressCallback(updateUserController));

export default userRouter;
