import _ from "lodash";
import { logger } from "../../configs/logs";

import IMatch, { MatchMode, MatchStatus } from "../../models/interfaces/match";
import { matchService } from "../index";

/**
 * @description If there is a match that meets the requirement -> update. Else create new record.
 * @function findMatch
 */
export default async function findMatch(payload: Partial<IMatch> & { user_id: string }) {
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
    } = payload;

    let match_details;
    const ideal_match = await matchService.findByCondition({ user_id, question_id, programming_language, mode });
    if (!ideal_match) {
      const mode_enum: MatchMode = <MatchMode>mode;
      match_details = await matchService.insert({
        partner1_id: user_id,
        question_id,
        programming_language,
        mode: mode_enum,
      });
      return { status: "waiting", match_id: match_details._id };
    } else {
      const match_id = _.get(ideal_match, "_id");
      match_details = await matchService.update({
        _id: match_id,
        partner2_id: user_id,
        status: MatchStatus.IN_PROGRESS,
      });
      return { status: "matched", match_id };
    }
  } catch (err) {
    logger.error(err);
  }
}
