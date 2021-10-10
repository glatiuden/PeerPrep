import _ from "lodash";

import { questionService } from "../../services";

/**
 * @description Hard delete existing question in database by ID
 * @function hardDeleteQuestionController
 */
async function hardDeleteQuestionController(httpRequest: Request & { context: { validated: { _id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { _id }: { _id: string } = _.get(httpRequest, "context.validated");
    const is_deleted = await questionService.hardDelete({ id: _id });
    if (!is_deleted) {
      throw new Error(`Question ${_id} is unable to hard delete.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        is_deleted,
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

export default hardDeleteQuestionController;
