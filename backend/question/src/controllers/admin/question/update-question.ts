import _ from "lodash";

import IQuestion from "../../../models/interfaces/question";

import { questionService } from "../../../services";

/**
 * @description Update existing question in database
 * @function updateQuestionController
 */
async function updateQuestionController(httpRequest: Request & { context: { validated: Partial<IQuestion> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const questionDetails: IQuestion = _.get(httpRequest, "context.validated");
    const updated_question = await questionService.update(questionDetails);
    if (!updated_question) {
      throw new Error(`Question was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: updated_question,
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

export default updateQuestionController;
