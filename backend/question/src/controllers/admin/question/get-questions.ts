import { questionService } from "../../../services";

/**
 * @description Get all questions
 * @function getQuestionsController
 */
async function getQuestionsController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const questions = await questionService.findAll();
    return {
      headers,
      statusCode: 200,
      body: {
        data: questions,
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

export default getQuestionsController;
