import express from "express";
import makeExpressCallback from "../../express-callback";
import makeValidator from "../../middlewares/validator-middleware";

import { createEditorRules, getEditorRules } from "../../controllers/editor/validators";
import { createEditorController, getEditorController, getEditorsController } from "../../controllers/editor";

const editorRouter = express.Router();

editorRouter.post("/", makeValidator(createEditorRules), makeExpressCallback(createEditorController)); // TODO: Change to get all by user_id only
editorRouter.get("/", makeExpressCallback(getEditorsController));
editorRouter.get("/:editor_id", makeValidator(getEditorRules), makeExpressCallback(getEditorController));

export default editorRouter;