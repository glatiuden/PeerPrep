import _ from "lodash";

import { matchService, questionService } from "../../../services";

/**
 * @description Get match by ID
 * @function getMatchController
 */
async function getMatchController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");
    const match = await matchService.findById({ id: match_id });
    if (!match) {
      throw new Error(`Match ${match_id} does not exist.`);
    }

    const question = await questionService.findById({ id: match.question_id });

    return {
      headers,
      statusCode: 200,
      body: {
        data: {
          ...match,
          question,
        },
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

export default getMatchController;
