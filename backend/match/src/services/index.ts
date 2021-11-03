import { rpcClient, pubsubClient } from "../configs/make-rabbitmq";
import { matchDbModel, eloMatchPoolDbModel, ratingDbModel } from "../models";

import makeEditorService from "./match";
import makeQuestionService from "./question";
import makeUserService from "./user";
import makeEloMatchPoolService from "./elo-match-pool";
import makeRatingService from "./rating";

const matchService = makeEditorService({ matchDbModel });
const eloMatchPoolService = makeEloMatchPoolService({ eloMatchPoolDbModel });
const ratingService = makeRatingService({ ratingDbModel });

const questionService = makeQuestionService({ rpcClient, pubsubClient });
const userService = makeUserService({ rpcClient, pubsubClient });

export default Object.freeze({ matchService, eloMatchPoolService, questionService, userService, ratingService });

export { matchService, eloMatchPoolService, questionService, userService, ratingService };
