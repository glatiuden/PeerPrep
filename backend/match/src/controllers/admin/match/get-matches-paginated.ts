import _ from "lodash";
import { logger } from "../../../configs/logs";
import { matchService } from "../../../services";

/**
 * @description Get all match records paginated
 * @function getMatchesPaginatedController
 */
async function getMatchesPaginatedController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const {
      programming_languages,
      statuses,
      query,
      page,
    }: { programming_languages: string[]; statuses: string[]; query: string; page: number } = _.get(
      httpRequest,
      "context.validated",
    );

    const matches_paginated = await matchService.findAllPaginated({
      programming_languages,
      statuses,
      query,
      page,
    });

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

export default getMatchesPaginatedController;
