import _ from "lodash";
import { Logger } from "winston";

import IEditor from "../../entities/interfaces/editor";
import { IUpdateEditor } from "../../use-cases/editor/update-editor";

export default function makeUpdateEditorController({
  updateEditor,
  logger,
}: {
  updateEditor: IUpdateEditor;
  logger: Logger;
}) {
  return async function updateEditorController(
    httpRequest: Request & { context: { validated: { editorDetails: IEditor } } },
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const editorDetails: IEditor = _.get(httpRequest, "context.validated");
      const { _id: editor_id } = editorDetails; // the editor's ID

      const updated_editor = await updateEditor({ editorDetails });
      if (!updated_editor) {
        throw new Error(`Editor by ${editor_id} unable to update.`);
      }

      logger.verbose("Editor updated", { editor_id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_editor,
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
