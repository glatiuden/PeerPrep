import _ from "lodash";

import { MatchStatus } from "../../../models/interfaces/match";
import { matchService } from "../../../services";

/**
 * @description Ends a match on request
 * @function endMatchController
 */
async function endMatchController(httpRequest: Request & { context: { validated: { match_id: string } } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const { match_id }: { match_id: string } = _.get(httpRequest, "context.validated");

    const updated_match = matchService.update({
      _id: match_id,
      status: MatchStatus.COMPLETED,
      updated_at: new Date(),
      completed_at: new Date(),
    });

    if (!updated_match) {
      throw new Error(`Match was not completed.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: true,
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

export default endMatchController;
