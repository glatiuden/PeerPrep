import _ from "lodash";

import IMatch from "../../models/interfaces/match";
import { matchService } from "../../services";

/**
 * @description Create new match record in database
 * @function createMatchController
 */
async function createMatchController(httpRequest: Request & { context: { validated: Partial<IMatch> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const matchDetails: IMatch = _.get(httpRequest, "context.validated");
    const created_match = await matchService.insert(matchDetails);
    if (!created_match) {
      throw new Error(`Match was not created.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: created_match,
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

export default createMatchController;
