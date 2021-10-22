import express from "express";
import makeExpressCallback from "../../express-callback";
import {
  createUserController,
  getUserController,
  updateUserController,
  loginUserController,
  getUserByEmailController,
} from "../../controllers/api/user";

import tokenValidator from "../../middleware/token-validator";

const userRouter = express.Router();

userRouter.post("/", makeExpressCallback(createUserController));
userRouter.post("/login", makeExpressCallback(loginUserController));

userRouter.get("/:user_id", makeExpressCallback(getUserController));
userRouter.get("/email/:email", makeExpressCallback(getUserByEmailController));

userRouter.put("/:user_id", makeExpressCallback(updateUserController));

export default userRouter;
