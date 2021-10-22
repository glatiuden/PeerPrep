import _ from "lodash";

import { questionService } from "../../../services";

/**
 * @description Delete existing question in database by ID
 * @function deleteQuestionController
 */
async function deleteQuestionController(httpRequest: Request & { context: { validated: { question_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { question_id }: { question_id: string } = _.get(httpRequest, "context.validated");
    const deleted_question = await questionService.delete({ id: question_id });
    if (!deleted_question) {
      throw new Error(`Question ${question_id} is unable to delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted: true,
        data: deleted_question,
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

export default deleteQuestionController;
