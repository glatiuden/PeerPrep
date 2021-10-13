import express from "express";
import adminRouter from "./admin";
import userRouter from "./user";

const router = express.Router();

router.use("/user", userRouter);
router.use("/admin", adminRouter);

export default router;