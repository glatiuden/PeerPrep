import _ from "lodash";

import IMatch from "../../models/interfaces/match";

import { matchService } from "../../services";

/**
 * @description Update existing match record in database
 * @function updateMatchController
 */
async function updateMatchController(httpRequest: Request & { context: { validated: Partial<IMatch> } }) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const matchDetails: IMatch = _.get(httpRequest, "context.validated");
    const updated_match = await matchService.update(matchDetails);
    if (!updated_match) {
      throw new Error(`Match was not updated.`);
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: updated_match,
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

export default updateMatchController;
