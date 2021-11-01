import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { createEditorRules, getEditorRules } from "../../controllers/editor/validators";
import {
  createEditorController,
  getEditorController,
  executeCodeController,
  getEditorByMatchIdController,
} from "../../controllers/editor";

const editorRouter = express.Router();

editorRouter.post("/", makeValidator(createEditorRules), makeExpressCallback(createEditorController));
editorRouter.get("/match/:match_id", makeExpressCallback(getEditorByMatchIdController));
editorRouter.get("/:editor_id", makeValidator(getEditorRules), makeExpressCallback(getEditorController));
editorRouter.post("/execute", makeExpressCallback(executeCodeController));
export default editorRouter;
