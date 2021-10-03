import _ from "lodash";

import { editorService } from "../../services";

/**
 * @description Get editor by ID
 * @function getEditorController
 */
async function getEditorController(httpRequest: Request & { context: { validated: { editor_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { editor_id }: { editor_id: string } = _.get(httpRequest, "context.validated");
    const editor = await editorService.findById({ id: editor_id });
    if (!editor) {
      throw new Error(`Editor by ${editor_id} does not exists.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: editor,
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

export default getEditorController;
