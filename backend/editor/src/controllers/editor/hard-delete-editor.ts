import _ from "lodash";
import { Logger } from "winston";

import { IHardDeleteEditorById } from "../../use-cases/editor/hard-delete-editor-by-id";

export default function makeHardDeleteEditorController({
  hardDeleteEditorById,
  logger,
}: {
  hardDeleteEditorById: IHardDeleteEditorById;
  logger: Logger;
}) {
  return async function hardDeleteEditorController(
    httpRequest: Request & { context: { validated: { editor_id: string } } },
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { editor_id }: { editor_id: string } = _.get(httpRequest, "context.validated");

      const is_deleted = await hardDeleteEditorById({ id: editor_id });
      if (!is_deleted) {
        throw new Error(`Editor by ${editor_id} unable to delete.`);
      }

      logger.verbose("Editor hard-deleted", { editor_id: editor_id });
      return {
        headers,
        statusCode: 200,
        body: {
          is_deleted,
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
