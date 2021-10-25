import { logger } from "../../configs/logs";

import { MatchStatus } from "../../models/interfaces/match";
import { matchService } from "../index";

/**
 * @description Cancels match.
 * @function cancelMatch
 */
export default async function cancelMatch(match_id: string) {
  try {
    const updated_match = await matchService.update({
      _id: match_id,
      status: MatchStatus.CANCELLED,
      updated_at: new Date(),
    });
    return !!updated_match;
  } catch (err) {
    logger.error(err);
  }
}
