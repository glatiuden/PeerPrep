import express from "express";
import adminTokenValidatorMiddleware from "../../middleware/admin-token-validator-middleware";
import adminRouter from "./admin";
import userRouter from "./user";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/user", adminTokenValidatorMiddleware, userRouter);

export default router;
