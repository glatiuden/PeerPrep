import _ from "lodash";
import { Logger } from "winston";

import IEditor from "../../entities/interfaces/editor";
import { ICreateEditor } from "../../use-cases/editor/create-editor";

/**
 * @description Create new editor record in database
 * @function createEditorController
 */
export default function makeCreateEditorController({
  createEditor,
  logger,
}: {
  createEditor: ICreateEditor;
  logger: Logger;
}) {
  return async function createEditorController(httpRequest: Request & { context: { validated: Partial<IEditor> } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const editorDetails: IEditor = _.get(httpRequest, "context.validated");
      const created_editor = await createEditor({ editorDetails });
      if (!created_editor) {
        throw new Error(`Editor was not created.`);
      }

      logger.verbose("Editor created", { editor_id: created_editor._id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_editor,
        },
      };
    } catch (err: any) {
      logger.error(err.message);
      return {
        headers,
        statusCode: 404,
        body: {
          errors: err.message,
        },
      };
    }
  };
}
