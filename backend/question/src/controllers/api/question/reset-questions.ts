import _ from "lodash";

import { questionService } from "../../../services";

/**
 * @description Delete all questions in the database
 * @function resetQuestionsController
 */
async function resetQuestionsController() {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const deleted_question = await questionService.reset();
    if (!deleted_question) {
      throw new Error(`Unable to delete all questions.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: "All questions have been deleted from the database",
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

export default resetQuestionsController;
