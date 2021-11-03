import getEditorRules from "./get-editor";
import updateEditorRules from "./update-editor";
import createEditorRules from "./create-editor";
import deleteEditorRules from "./delete-editor";
import executeCodeRules from "./execute-code";

export default Object.freeze({
  getEditorRules,
  createEditorRules,
  updateEditorRules,
  deleteEditorRules,
  executeCodeRules,
});

export { getEditorRules, createEditorRules, updateEditorRules, deleteEditorRules, executeCodeRules };
