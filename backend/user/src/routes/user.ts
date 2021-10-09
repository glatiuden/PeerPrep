import express from "express";
import makeExpressCallback from "../express-callback";
import { createUserController } from "../controllers"
import makeValidator from "../middleware/validator-middleware";
import { createUserRules } from "../controllers/validators";

const userRouter = express.Router();

userRouter.post("/", makeValidator(createUserRules), makeExpressCallback(createUserController))


export default userRouter;