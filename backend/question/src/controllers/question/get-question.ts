import _ from "lodash";

import { questionService } from "../../services";

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
    const question = await questionService.findById({ id: question_id });
    if (!question) {
      throw new Error(`Question ${question_id} does not exists.`);
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
