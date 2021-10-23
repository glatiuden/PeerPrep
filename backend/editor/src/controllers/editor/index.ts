import createEditorController from "./create-editor";
import getEditorsController from "./get-editors";
import getEditorsPaginatedController from "./get-editors-paginated";
import getEditorController from "./get-editor";
import updateEditorController from "./update-editor";
import deleteEditorController from "./delete-editor";
import hardDeleteEditorController from "./hard-delete-editor";
import executeCodeController from "./execute-code";

const editorController = Object.freeze({
  createEditorController,
  getEditorsController,
  getEditorsPaginatedController,
  getEditorController,
  updateEditorController,
  deleteEditorController,
  hardDeleteEditorController,
  executeCodeController,
});

export default editorController;

export {
  createEditorController,
  getEditorsController,
  getEditorsPaginatedController,
  getEditorController,
  updateEditorController,
  deleteEditorController,
  hardDeleteEditorController,
  executeCodeController,
};
