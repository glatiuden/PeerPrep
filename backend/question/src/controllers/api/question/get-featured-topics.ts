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
    const topics = await questionService.findFeaturedTopics();
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
