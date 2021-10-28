import _ from "lodash";

import { logger } from "../../../configs/logs";
import { matchService } from "../../../services";

/**
 * @description Get all match records by user ID
 * @function getMatchesByUserIdPaginatedController
 */
async function getMatchesByUserIdPaginatedController(
  httpRequest: Request & { context: { validated: { user_id: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const query_conditions = _.get(httpRequest, "context.validated");
    const matches_paginated = await matchService.findAllByUserIdPaginated(query_conditions);
    logger.verbose(`Fetched matches paginated`, {
      length: matches_paginated?.pagination.total,
    });
    return {
      headers,
      statusCode: 200,
      body: {
        ...matches_paginated,
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

export default getMatchesByUserIdPaginatedController;
