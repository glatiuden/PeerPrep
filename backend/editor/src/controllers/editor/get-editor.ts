import _ from "lodash";
import { Logger } from "winston";

import { IGetEditorById } from "../../use-cases/editor/get-editor-by-id";

export default function makeGetEditorController({
  getEditorById,
  logger,
}: {
  getEditorById: IGetEditorById;
  logger: Logger;
}) {
  return async function getEditorController(httpRequest: Request & { context: { validated: { editor_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { editor_id }: { editor_id: string } = _.get(httpRequest, "context.validated");
      const editor = await getEditorById({ id: editor_id });
      if (!editor) {
        throw new Error(`Editor by ${editor_id} does not exists.`);
      }

      logger.verbose("Editor retrieved", { editor_id });
      return {
        headers,
        statusCode: 200,
        body: {
          data: editor,
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
