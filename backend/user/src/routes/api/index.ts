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
userRouter.post("/logout", makeExpressCallback(logoutUserController));

userRouter.get("/auth", tokenValidatorMiddleware, makeExpressCallback(getUserController)); // Used to check whether is user token valid
userRouter.get("/email/:email", makeExpressCallback(getUserByEmailController));
userRouter.get("/:user_id", tokenValidatorMiddleware, makeExpressCallback(getUserController));
userRouter.put("/elo/:user_id", makeExpressCallback(updateUserEloController));
userRouter.put("/:user_id", makeExpressCallback(updateUserController));

export default userRouter;
