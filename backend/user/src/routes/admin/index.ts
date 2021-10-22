import express from "express";
import adminRouter from "./admin";
import userRouter from "./admin";

const router = express.Router();

router.use("/admin", adminRouter);
router.use("/user", userRouter);

export default router;
