import { questionService } from "../../services";

/**
 * @description Get all question topics
 * @function getQuestionTopicsController
 */
async function getQuestionTopicsController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const topics = await questionService.findAllTopics();
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

export default getQuestionTopicsController;
