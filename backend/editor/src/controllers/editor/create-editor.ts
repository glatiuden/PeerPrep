import _ from "lodash";

import Editor from "../../models/interfaces/editor";
import { EditorDb } from "../../data-access";

/**
 * @description Create new note
 * @function createEditorController
 */
export default async function createEditorController(
  httpRequest: Request & { context: { validated: Partial<Editor> } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const noteDetails: Editor = _.get(httpRequest, "context.validated");
    const created_note = await EditorDb.insert(noteDetails);
    if (!created_note) {
      throw new Error(`Editor was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_note,
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
