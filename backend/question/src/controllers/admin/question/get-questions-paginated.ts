import _ from "lodash";
import { logger } from "../../../configs/logs";
import { questionService } from "../../../services";

/**
 * @description Get all question records paginated
 * @function getQuestionsPaginatedController
 */
async function getQuestionsPaginatedController(httpRequest: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const {
      difficulty_levels,
      topics,
      query,
      page,
    }: { difficulty_levels: string[]; topics: string[]; query: string; page: number } = _.get(
      httpRequest,
      "context.validated",
    );

    const questions_paginated = await questionService.findAllPaginated({
      difficulty_levels,
      topics,
      query,
      page,
    });

    logger.verbose(`Fetched questions paginated`, {
      query,
      page,
      length: questions_paginated?.pagination.total,
    });
    return {
      headers,
      statusCode: 200,
      body: {
        ...questions_paginated,
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

export default getQuestionsPaginatedController;
