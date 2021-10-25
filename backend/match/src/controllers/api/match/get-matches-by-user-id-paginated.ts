import _ from "lodash";
import { logger } from "../../../configs/logs";
import { MatchStatus } from "../../../models/interfaces/match";
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
    const {
      user_id,
      is_elo_match,
      status,
      query,
      page,
    }: { user_id: string; is_elo_match?: boolean; status?: string; query: string; page: number } = _.get(
      httpRequest,
      "context.validated",
    );

    const query_conditions = { user_id, is_elo_match };
    if (status) {
      query_conditions["status"] = <MatchStatus>status;
    }

    const matches_paginated = await matchService.findAllByUserIdPaginated(query_conditions, { query, page });
    logger.verbose(`Fetched matches paginated`, {
      query,
      page,
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
