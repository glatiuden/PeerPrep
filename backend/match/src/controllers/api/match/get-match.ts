import _ from "lodash";

import { getMatch } from "../../../services/use-cases";

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
    const match_with_question_and_user = await getMatch(match_id);

    return {
      headers,
      statusCode: 200,
      body: {
        data: match_with_question_and_user,
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
