import _ from "lodash";

import IQuestion from "../../../models/interfaces/question";
import { questionService } from "../../../services";

/**
 * @description Create new question in database
 * @function createQuestionController
 */
async function createQuestionController(httpRequest: Request & { context: { validated: Partial<IQuestion> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const questionDetails: IQuestion = _.get(httpRequest, "context.validated");
    const created_question = await questionService.insert(questionDetails);
    if (!created_question) {
      throw new Error(`Question was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_question,
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

export default createQuestionController;
