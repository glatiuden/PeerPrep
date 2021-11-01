import { EditorDb } from "../../data-access";

import makeCreateEditor from "./create-editor";
import makeGetEditorById from "./get-editor-by-id";
import makeGetEditorByMatchId from "./get-editor-by-match-id";
import makeGetEditors from "./get-editors";
import makeUpdateEditor from "./update-editor";
import makeDeleteEditorById from "./delete-editor-by-id";
import makeHardDeleteEditorById from "./hard-delete-editor-by-id";

/**
 * @description Use case to create a new editor
 * @function createEditor
 */
const createEditor = makeCreateEditor({ editorDb: EditorDb });

/**
 * @description Use case to get editor by ID
 * @function getEditorById
 */
const getEditorById = makeGetEditorById({ editorDb: EditorDb });

/**
 * @description Use case to get editor by Match ID
 * @function getEditorByMatchId
 */
const getEditorByMatchId = makeGetEditorByMatchId({ editorDb: EditorDb });

/**
 * @description Use case to get all editors
 * @function getEditors
 */
const getEditors = makeGetEditors({ editorDb: EditorDb });

/**
 * @description Use case to update editor
 * @function updateEditor
 */
const updateEditor = makeUpdateEditor({ editorDb: EditorDb });

/**
 * @description Use case to delete editor by ID
 * @function deleteEditorById
 */
const deleteEditorById = makeDeleteEditorById({ editorDb: EditorDb });

/**
 * @description Use case to hard delete editor by ID
 * @function hardDeleteEditorById
 */
const hardDeleteEditorById = makeHardDeleteEditorById({ editorDb: EditorDb });

const editorServices = Object.freeze({
  createEditor,
  getEditorById,
  getEditorByMatchId,
  getEditors,
  updateEditor,
  deleteEditorById,
  hardDeleteEditorById,
});

export default editorServices;
export {
  createEditor,
  getEditorById,
  getEditorByMatchId,
  getEditors,
  updateEditor,
  deleteEditorById,
  hardDeleteEditorById,
};
