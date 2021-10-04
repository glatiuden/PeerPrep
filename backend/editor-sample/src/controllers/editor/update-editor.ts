import _ from "lodash";

import IEditor from "../../models/interfaces/editor";

import { editorService } from "../../services";

/**
 * @description Update existing editor record in database
 * @function updateEditorController
 */
async function updateEditorController(httpRequest: Request & { context: { validated: Partial<IEditor> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const editorDetails: IEditor = _.get(httpRequest, "context.validated");
    const updated_editor = await editorService.update(editorDetails);
    if (!updated_editor) {
      throw new Error(`Editor was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: updated_editor,
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

export default updateEditorController;
