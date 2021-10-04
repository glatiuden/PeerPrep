import _ from "lodash";

import IEditor from "../../models/interfaces/editor";
import { editorService } from "../../services";

/**
 * @description Create new editor record in database
 * @function createEditorController
 */
async function createEditorController(httpRequest: Request & { context: { validated: Partial<IEditor> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const editorDetails: IEditor = _.get(httpRequest, "context.validated");
    const created_editor = await editorService.insert(editorDetails);
    if (!created_editor) {
      throw new Error(`Editor was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_editor,
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

export default createEditorController;
