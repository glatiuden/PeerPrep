import _ from "lodash";
import mongoose from "mongoose";
import { logger } from "../../configs/logs";
import IEloMatchPool, { EloMatchPoolStatus } from "../../models/interfaces/elo-match-pool";

import { MatchMode, MatchStatus, QuestionMode } from "../../models/interfaces/match";
import { eloMatchPoolService, questionService, matchService } from "../index";

/**
 * @description If there is a match that meets the requirement -> update. Else create new record.
 * @function findEloMatch
 */
export default async function findEloMatch(payload: IEloMatchPool) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { user_id, programming_language, difficulty, topic }: IEloMatchPool = payload;

    const ideal_elo_match = await eloMatchPoolService.findByCondition(payload);

    let elo_match_pool_id;
    const no_match_found = !ideal_elo_match;
    if (no_match_found) {
      const elo_match_pool_details = await eloMatchPoolService.insert(
        {
          ...payload,
          status: EloMatchPoolStatus.WAITING,
        },
        { session },
      );

      await session.commitTransaction();
      elo_match_pool_id = _.get(elo_match_pool_details, "_id");
      return { status: "waiting", elo_match_pool_id };
    }

    elo_match_pool_id = _.get(ideal_elo_match, "_id");
    const random_question = await questionService.findByDifficultyAndTopic({ difficulty, topic });

    // Update the pool to updated so no user can match with this person
    await eloMatchPoolService.update(
      {
        _id: elo_match_pool_id,
        status: EloMatchPoolStatus.MATCHED,
        updated_at: new Date(),
      },
      { session },
    );

    // Create Match
    const { user_id: partner1_id } = ideal_elo_match;
    const created_match = await matchService.insert(
      {
        partner1_id: partner1_id,
        partner2_id: user_id,
        question_id: random_question._id,
        mode: MatchMode.ELO,
        match_requirements: {
          programming_language,
          question_mode: QuestionMode.TIMED,
          elo_match_pool: ideal_elo_match,
        },
        status: MatchStatus.IN_PROGRESS,
      },
      { session },
    );

    // Update the pool to updated
    await session.commitTransaction();
    const match_id = _.get(created_match, "_id");
    return { status: "matched", elo_match_pool_id, match_id };
  } catch (err) {
    logger.error(err);
    await session.abortTransaction();
  }
}
