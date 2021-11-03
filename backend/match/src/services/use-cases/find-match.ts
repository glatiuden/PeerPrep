import _ from "lodash";
import mongoose from "mongoose";
import { logger } from "../../configs/logs";

import IMatch, { MatchMode, MatchStatus, QuestionMode } from "../../models/interfaces/match";
import { matchService, questionService } from "../index";

/**
 * @description If there is a match that meets the requirement -> update. Else create new record.
 * @function findMatch
 */
export default async function findMatch(payload: Partial<IMatch> & { question_id: string } & { user_id: string }) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      user_id,
      question_id,
      match_requirements,
    }: { user_id: string; question_id: string; match_requirements?: any } = payload;

    const { programming_language, question_mode }: { programming_language: string; question_mode?: QuestionMode } =
      match_requirements;

    const ideal_match = await matchService.findByCondition({
      user_id,
      mode: MatchMode.QUESTION,
      question_id,
      programming_language,
      question_mode,
    });

    if (!ideal_match) {
      const match_details = await matchService.insert(
        {
          partner1_id: user_id,
          question_id,
          mode: MatchMode.QUESTION,
          match_requirements: {
            programming_language,
            question_mode: question_mode,
          },
        },
        { session },
      );

      if (!match_details) {
        throw Error("Match not created");
      }

      await session.commitTransaction();
      const match_id = _.get(match_details, "_id");
      return { status: "waiting", match_id };
    }

    const match_id = _.get(ideal_match, "_id");
    await matchService.update(
      {
        _id: match_id,
        partner2_id: user_id,
        status: MatchStatus.IN_PROGRESS,
        matched_at: new Date(),
        updated_at: new Date(),
      },
      { session },
    );
    questionService.updateQuestionAttemptCount({ question_id });
    await session.commitTransaction();
    return { status: "matched", match_id };
  } catch (err) {
    logger.error(err);
    await session.abortTransaction();
  }
}
