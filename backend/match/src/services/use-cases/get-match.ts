import { logger } from "../../configs/logs";

import { matchService, questionService, userService } from "../index";
import { redisClient } from "../../configs/make-redis";
import _ from "lodash";

/**
 * @description Get match records with user and question details.
 * @function getMatch
 */
export default async function getMatch(match_id: string) {
  const redis_key = `record-${match_id}`;
  try {
    const data_exist_in_cache = await redisClient.getAsync(redis_key);
    if (data_exist_in_cache) {
      logger.verbose(`Redis: Match ${match_id} found in cache! Returning...`);
      return JSON.parse(data_exist_in_cache);
    }

    let match = await matchService.findById({ id: match_id });
    if (!match) {
      throw new Error(`Match ${match_id} does not exist.`);
    }

    const question = await questionService.findById({ id: match.question_id });
    const users = await userService.findByIds({ user_ids: [match.partner1_id, match.partner2_id] });
    const partner1 = _.find(users, ({ _id }) => String(_id) === String(match?.partner1_id));
    const partner2 = _.find(users, ({ _id }) => String(_id) === String(match?.partner2_id));

    const has_no_meta = !_.get(match, "meta.partner1_display_name");
    if (has_no_meta) {
      match = await matchService.update({
        _id: match_id,
        meta: {
          ...match.meta,
          partner1_display_name: partner1.display_name,
          partner2_display_name: partner2.display_name,
          question_title: question.title,
        },
        updated_at: new Date(),
      });
    }

    const match_with_question_and_user = Object.assign({}, match, { question, partner1, partner2 });

    await redisClient.setAsync(
      redis_key,
      JSON.stringify(match_with_question_and_user),
      "EX",
      question.recommended_duration * 60,
    ); // Cache last for duration of the question
    return match_with_question_and_user;
  } catch (err) {
    logger.error(err);
  }
}
