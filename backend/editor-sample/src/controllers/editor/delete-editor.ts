import _ from "lodash";

import { editorService } from "../../services";

/**
 * @description Delete existing editor record in database by ID
 * @function deleteEditorController
 */
async function deleteEditorController(httpRequest: Request & { context: { validated: { editor_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { editor_id }: { editor_id: string } = _.get(httpRequest, "context.validated");
    const deleted_editor = await editorService.delete({ id: editor_id });
    if (!deleted_editor) {
      throw new Error(`Editor by ${editor_id} is unable to delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: deleted_editor,
      },
    };
  } catch (err: any) {
    return {
      headers,
      statusCode: 404,
      body: {
        errors: err.message,
      },
    };
  }
}

export default deleteEditorController;
