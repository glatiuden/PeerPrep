import _ from "lodash";

import IMatch, { MatchStatus } from "../../../models/interfaces/match";
import { matchService } from "../../../services";

/**
 * @description If there is a match that meets the requirement -> update. Else create new record
 * @function findMatchController
 */
async function findMatchController(
  httpRequest: Request & { context: { validated: Partial<IMatch> & { user_id: string } } },
) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const {
      user_id,
      question_id,
      programming_language,
      mode,
    }: {
      user_id: string;
      question_id?: string;
      programming_language?: string;
      mode?: string;
    } = _.get(httpRequest, "context.validated");

    let match_details;
    const ideal_match = matchService.findByCondition({ user_id, question_id, programming_language, mode });
    if (!ideal_match) {
      match_details = await matchService.insert({
        partner1_id: user_id,
        question_id,
        programming_language,
      });
    } else {
      match_details = matchService.update({
        partner2_id: user_id,
        status: MatchStatus.IN_PROGRESS,
      });
    }

    return {
      headers,
      statusCode: 200,
      body: {
        data: match_details,
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

export default findMatchController;
