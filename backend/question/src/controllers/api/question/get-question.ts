import _ from "lodash";
import { logger } from "../../../configs/logs";
import { redisClient } from "../../../configs/make-redis";

import { questionService } from "../../../services";

/**
 * @description Get question by ID
 * @function getQuestionController
 */
async function getQuestionController(httpRequest: Request & { context: { validated: { question_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { question_id }: { question_id: string } = _.get(httpRequest, "context.validated");
    const redis_key = `question-${question_id}`;

    if (redisClient.has_redis) {
      const data_exist_in_cache = await redisClient.getAsync(redis_key);
      if (data_exist_in_cache) {
        logger.verbose(`Redis: Question ${question_id} found in cache! Returning...`);
        return {
          headers,
          statusCode: 200,
          body: {
            data: JSON.parse(data_exist_in_cache),
          },
        };
      }
    }

    const question = await questionService.findById({ id: question_id });
    if (!question) {
      throw new Error(`Question ${question_id} does not exists.`);
    }

    if (redisClient.has_redis) {
      await redisClient.setAsync(redis_key, JSON.stringify(question), "EX", 180000); // Cache last for 3 minutes
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: question,
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

export default getQuestionController;
