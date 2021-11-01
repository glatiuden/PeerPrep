import _ from "lodash";
import { Logger } from "winston";

import { IGetEditorByMatchId } from "../../use-cases/editor/get-editor-by-match-id";

export default function makeGetEditorCoMatchntroller({
  getEditorByMatchId,
  logger,
}: {
  getEditorByMatchId: IGetEditorByMatchId;
  logger: Logger;
}) {
  return async function getEditorController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
      const editor = await getEditorByMatchId({ match_id });
      if (!editor) {
        throw new Error(`Editor by ${match_id} does not exists.`);
      }

      logger.verbose("Editor retrieved", { match_id });
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
