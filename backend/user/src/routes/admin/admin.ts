import express from "express";
import makeExpressCallback from "../../express-callback";
import {
  createAdminController,
  loginAdminController,
  getAdminController,
  logoutAdminContorller,
} from "../../controllers/admin/admin";

import adminTokenValidatorMiddleware from "../../middleware/admin-token-validator-middleware";

const adminRouter = express.Router();

adminRouter.post("/", adminTokenValidatorMiddleware, makeExpressCallback(createAdminController));
adminRouter.post("/login", makeExpressCallback(loginAdminController));
adminRouter.post("/logout", adminTokenValidatorMiddleware, makeExpressCallback(logoutAdminContorller));
adminRouter.get("/auth", adminTokenValidatorMiddleware, makeExpressCallback(getAdminController)); // Used to check whether is user token valid

export default adminRouter;
