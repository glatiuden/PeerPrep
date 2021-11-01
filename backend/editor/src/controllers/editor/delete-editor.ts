import _ from "lodash";
import { Logger } from "winston";

import { IDeleteEditorById } from "../../use-cases/editor/delete-editor-by-id";

export default function makeDeleteEditorController({
  deleteEditorById,
  logger,
}: {
  deleteEditorById: IDeleteEditorById;
  logger: Logger;
}) {
  return async function deleteEditorController(
    httpRequest: Request & { context: { validated: { editor_id: string } } },
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { editor_id }: { editor_id: string } = _.get(httpRequest, "context.validated");
      const deleted_editor = await deleteEditorById({ id: editor_id });
      if (!deleted_editor) {
        throw new Error(`Editor by ${editor_id} unable to delete.`);
      }

      logger.verbose("Editor soft-deleted", { editor_id });
      return {
        headers,
        statusCode: 200,
        body: {
          is_deleted: true,
          data: deleted_editor,
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
