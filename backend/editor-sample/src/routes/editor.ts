import express from "express";
import makeExpressCallback from "../express-callback";
import makeValidator from "../middlewares/validator-middleware";

import {
  createEditorRules,
  deleteEditorRules,
  getEditorRules,
  updateEditorRules,
} from "../controllers/editor/validators";
import {
  createEditorController,
  deleteEditorController,
  getEditorController,
  getEditorsController,
  hardDeleteEditorController,
  updateEditorController,
} from "../controllers/editor";

const editorRouter = express.Router();

editorRouter.post("/", makeValidator(createEditorRules), makeExpressCallback(createEditorController));
editorRouter.get("/", makeExpressCallback(getEditorsController));
editorRouter.get("/:editor_id", makeValidator(getEditorRules), makeExpressCallback(getEditorController));
editorRouter.put("/", makeValidator(updateEditorRules), makeExpressCallback(updateEditorController));
editorRouter.delete("/:editor_id", makeValidator(deleteEditorRules), makeExpressCallback(deleteEditorController));
editorRouter.delete(
  "/hard-delete/:editor_id",
  makeValidator(deleteEditorRules),
  makeExpressCallback(hardDeleteEditorController),
);

export default editorRouter;
