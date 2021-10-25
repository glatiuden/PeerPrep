import _ from "lodash";
import { logger } from "../../configs/logs";

import IMatch, { MatchMode, MatchStatus, QuestionMode } from "../../models/interfaces/match";
import { matchService, questionService } from "../index";

/**
 * @description If there is a match that meets the requirement -> update. Else create new record.
 * @function findEloMatch
 */
export default async function findEloMatch(payload: Partial<IMatch> & { user_id: string }) {
  try {
    const { user_id, match_requirements }: { user_id: string; match_requirements?: any } = payload;
    const {
      difficulty,
      programming_language,
      topic,
    }: { difficulty: string; programming_language: string; topic?: string } = match_requirements;

    let match_details;
    const ideal_match = await matchService.findByCondition({
      user_id,
      mode: MatchMode.ELO,
      difficulty,
      programming_language,
      topic,
    });

    const no_match_found = !ideal_match;
    if (no_match_found) {
      match_details = await matchService.insert({
        partner1_id: user_id,
        mode: MatchMode.ELO,
        match_requirements: {
          programming_language,
          question_mode: QuestionMode.TIMED,
          difficulty,
          topic,
        },
      });
      return { status: "waiting", match_id: match_details._id };
    }

    const match_id = _.get(ideal_match, "_id");
    const random_question = await questionService.findByDifficultyAndTopic({ difficulty, topic });
    match_details = await matchService.update({
      _id: match_id,
      partner2_id: user_id,
      question_id: random_question._id,
      status: MatchStatus.IN_PROGRESS,
      updated_at: new Date(),
    });
    return { status: "matched", match_id };
  } catch (err) {
    logger.error(err);
  }
}
