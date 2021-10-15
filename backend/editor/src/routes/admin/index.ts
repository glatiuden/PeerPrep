import express from "express";
import editorRouter from "./editor";

const router = express.Router();

router.use("/editor", editorRouter);

export default router;
