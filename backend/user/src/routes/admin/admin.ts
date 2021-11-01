import express from "express";
import makeExpressCallback from "../../express-callback";
import {
  createAdminController,
  loginAdminController,
  getAdminController,
  logoutAdminContorller,
} from "../../controllers/admin/admin";

import tokenValidatorMiddleware from "../../middleware/token-validator-middleware";

const adminRouter = express.Router();

adminRouter.post("/", makeExpressCallback(createAdminController));
adminRouter.post("/login", makeExpressCallback(loginAdminController));
adminRouter.post("/logout", makeExpressCallback(logoutAdminContorller));
adminRouter.get("/auth", tokenValidatorMiddleware, makeExpressCallback(getAdminController)); // Used to check whether is user token valid

export default adminRouter;
