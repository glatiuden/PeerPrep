import _ from "lodash";
import { logger } from "../../../configs/logs";
import { redisClient } from "../../../configs/make-redis";
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
      difficulty_levels = [],
      topics = [],
      query = "",
      page = 1,
    }: { difficulty_levels: string[]; topics: string[]; query: string; page: number } = _.get(
      httpRequest,
      "context.validated",
    );

    const redis_key = `question-${difficulty_levels.join()}-${topics.join()}-${query}-${page}`;
    if (redisClient.has_redis) {
      const data_exist_in_cache = await redisClient.getAsync(redis_key);
      if (data_exist_in_cache) {
        logger.verbose(`Redis: Questions found in cache! Returning...`);
        return {
          headers,
          statusCode: 200,
          body: {
            ...JSON.parse(data_exist_in_cache),
          },
        };
      }
    }

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

    console.log(redisClient);
    if (redisClient.has_redis) {
      await redisClient.setAsync(redis_key, JSON.stringify(questions_paginated), "EX", 180000); // Cache last for 3 minutes
    }
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
