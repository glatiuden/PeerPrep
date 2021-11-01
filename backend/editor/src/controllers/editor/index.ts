import { logger } from "../../configs/logs";

import {
  createEditor,
  getEditorById,
  getEditorByMatchId,
  getEditors,
  updateEditor,
  deleteEditorById,
  hardDeleteEditorById,
} from "../../use-cases/editor";

import makeCreateEditorController from "./create-editor";
import makeGetEditorController from "./get-editor";
import makeGetEditorByMatchIdController from "./get-editor-by-match-id";
import makeGetEditors from "./get-editors";
import makeUpdateEditorController from "./update-editor";
import makeDeleteEditorController from "./delete-editor";
import makeHardDeleteEditorController from "./hard-delete-editor";
import makeExecuteCodeController from "./execute-code";

/**
 * @description Execute code
 * @function executeCodeController
 */
const executeCodeController = makeExecuteCodeController({ logger });

/**
 * @description Create new editor
 * @function createEditorController
 */
const createEditorController = makeCreateEditorController({ createEditor, logger });

/**
 * @description Get editor by ID
 * @function getEditorController
 */
const getEditorController = makeGetEditorController({ getEditorById, logger });

/**
 * @description Get editor by Match ID
 * @function getEditorByMatchIdController
 */
const getEditorByMatchIdController = makeGetEditorByMatchIdController({ getEditorByMatchId, logger });

/**
 * @description Get all editors
 * @function getEditorsController
 */
const getEditorsController = makeGetEditors({ getEditors, logger });

/**
 * @description Update editor's details
 * @function updateEditorController
 */
const updateEditorController = makeUpdateEditorController({ updateEditor, logger });

/**
 * @description Soft delete a editor
 * @function deleteEditorController
 */
const deleteEditorController = makeDeleteEditorController({ deleteEditorById, logger });

/**
 * @description Hard delete a editor
 * @function hardDeleteEditorController
 */
const hardDeleteEditorController = makeHardDeleteEditorController({ hardDeleteEditorById, logger });

const editorController = Object.freeze({
  createEditorController,
  getEditorController,
  getEditorByMatchIdController,
  deleteEditorController,
  updateEditorController,
  getEditorsController,
  hardDeleteEditorController,
  executeCodeController,
});

export default editorController;
export {
  createEditorController,
  getEditorController,
  getEditorByMatchIdController,
  deleteEditorController,
  updateEditorController,
  getEditorsController,
  hardDeleteEditorController,
  executeCodeController,
};
