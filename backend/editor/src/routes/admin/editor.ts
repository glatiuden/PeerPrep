import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import {
  deleteEditorRules,
  getEditorRules,
  createEditorRules,
  updateEditorRules,
} from "../../controllers/editor/validators";
import {
  deleteEditorController,
  getEditorController,
  getEditorsController,
  getEditorsPaginatedController,
  hardDeleteEditorController,
  createEditorController,
  updateEditorController,
} from "../../controllers/editor";

const editorRouter = express.Router();

editorRouter.post("/", makeValidator(createEditorRules), makeExpressCallback(createEditorController)); // TODO: Change to get all by user_id only
editorRouter.get("/", makeExpressCallback(getEditorsController));
editorRouter.get("/paginated", makeExpressCallback(getEditorsPaginatedController));
editorRouter.put("/", makeValidator(updateEditorRules), makeExpressCallback(updateEditorController));
editorRouter.get("/:editor_id", makeValidator(getEditorRules), makeExpressCallback(getEditorController));
editorRouter.delete("/:editor_id", makeValidator(deleteEditorRules), makeExpressCallback(deleteEditorController));
editorRouter.delete(
  "/hard-delete/:editor_id",
  makeValidator(deleteEditorRules),
  makeExpressCallback(hardDeleteEditorController),
);

export default editorRouter;
