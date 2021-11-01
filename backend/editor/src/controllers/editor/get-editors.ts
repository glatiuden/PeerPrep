import _ from "lodash";
import { Logger } from "winston";

import { IGetEditors } from "../../use-cases/editor/get-editors";

export default function makeGetEditorsController({ getEditors, logger }: { getEditors: IGetEditors; logger: Logger }) {
  return async function getEditorsController() {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const editors = await getEditors();

      logger.verbose("Editors retrieved", { editors_count: editors.length });
      return {
        headers,
        statusCode: 200,
        body: {
          data: editors,
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
