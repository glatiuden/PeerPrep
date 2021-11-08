import { logger } from "../../../configs/logs";
import { redisClient } from "../../../configs/make-redis";
import { questionService } from "../../../services";

/**
 * @description Get all featured question topics
 * @function getFeaturedQuestionTopicsController
 */
async function getFeaturedQuestionTopicsController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const redis_key = `question-featured_topics`;
    const data_exist_in_cache = await redisClient.getAsync(redis_key);

    if (data_exist_in_cache) {
      logger.verbose(`Redis: Featured topics found in cache! Returning...`);
      return {
        headers,
        statusCode: 200,
        body: {
          data: JSON.parse(data_exist_in_cache),
        },
      };
    }

    const topics = await questionService.findFeaturedTopics();
    await redisClient.setAsync(redis_key, JSON.stringify(topics), "EX", 180000); // Cache last for 3 minutes

    return {
      headers,
      statusCode: 200,
      body: {
        data: topics,
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

export default getFeaturedQuestionTopicsController;
