import _ from "lodash";

import { editorService } from "../../services";

/**
 * @description Hard delete existing editor record in database by ID
 * @function hardDeleteEditorController
 */
async function hardDeleteEditorController(httpRequest: Request & { context: { validated: { editor_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { editor_id }: { editor_id: string } = _.get(httpRequest, "context.validated");
    const is_deleted = await editorService.hardDelete({ id: editor_id });
    if (!is_deleted) {
      throw new Error(`Editor by ${editor_id} is unable to hard delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted,
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

export default hardDeleteEditorController;
