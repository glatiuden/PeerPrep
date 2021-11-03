import { logger } from "../../configs/logs";
import { EloMatchPoolStatus } from "../../models/interfaces/elo-match-pool";

import { eloMatchPoolService } from "../index";

/**
 * @description Cancels match.
 * @function cancelEloMatch
 */
export default async function cancelEloMatch(elo_match_pool_id: string) {
  try {
    if (!elo_match_pool_id) {
      return true; // Nothing to cancel
    }

    const updated_match = await eloMatchPoolService.update({
      _id: elo_match_pool_id,
      status: EloMatchPoolStatus.CANCELLED,
      updated_at: new Date(),
    });

    return !!updated_match;
  } catch (err) {
    logger.error(err);
  }
}
