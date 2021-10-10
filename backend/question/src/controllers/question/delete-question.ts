import _ from "lodash";

import { questionService } from "../../services";

/**
 * @description Delete existing question in database by ID
 * @function deleteQuestionController
 */
async function deleteQuestionController(httpRequest: Request & { context: { validated: { _id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { _id }: { _id: string } = _.get(httpRequest, "context.validated");
    const deleted_question = await questionService.delete({ id: _id });
    if (!deleted_question) {
      throw new Error(`Question ${_id} is unable to delete.`);
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
