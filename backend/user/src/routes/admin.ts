import express from "express";
import makeExpressCallback from "../express-callback";
import {
  createAdminController,
  loginAdminController
} from "../controllers/admin"

const adminRouter = express.Router();

adminRouter.post("/", makeExpressCallback(createAdminController));
adminRouter.post("/login", makeExpressCallback(loginAdminController));

export default adminRouter;