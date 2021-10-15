import _ from "lodash";
import { logger } from "../../configs/logs";
import { editorService } from "../../services";

/**
 * @description Get all editor records paginated
 * @function getEditorsPaginatedController
 */
async function getEditorsPaginatedController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { query, page }: { query: string; page: number } = _.get(httpRequest, "context.validated");
    const editors_paginated = await editorService.findAllPaginated({ query, page });
    logger.verbose(`Fetched editors paginated`, {
      query,
      page,
      length: editors_paginated?.pagination.total,
    });
    return {
      headers,
      statusCode: 200,
      body: {
        ...editors_paginated,
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
}

export default getEditorsPaginatedController;
