import _ from "lodash";

import { questionService } from "../../services";

/**
 * @description Get question by ID
 * @function getQuestionController
 */
async function getQuestionController(httpRequest: Request & { context: { validated: { _id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { _id }: { _id: string } = _.get(httpRequest, "context.validated");
    const question = await questionService.findById({ id: _id });
    if (!question) {
      throw new Error(`Question ${_id} does not exists.`);
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
