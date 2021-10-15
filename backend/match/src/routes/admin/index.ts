import express from "express";
import matchRouter from "./match";

const router = express.Router();

router.use("/match", matchRouter);

export default router;
