import RabbitMQRPQ from "../configs/make-rabbitmq-rpc";
import { matchDbModel, eloMatchPoolDbModel, ratingDbModel } from "../models";

import makeEditorService from "./match";
import makeQuestionService from "./question";
import makeUserService from "./user";
import makeEloMatchPoolService from "./elo-match-pool";
import makeRatingService from "./rating";

const matchService = makeEditorService({ matchDbModel });
const eloMatchPoolService = makeEloMatchPoolService({ eloMatchPoolDbModel });
const ratingService = makeRatingService({ ratingDbModel });

const questionService = makeQuestionService({ exchange: RabbitMQRPQ.getExchange() });
const userService = makeUserService({ exchange: RabbitMQRPQ.getExchange(), publisher: RabbitMQRPQ.getPublisher() });

export default Object.freeze({ matchService, eloMatchPoolService, questionService, userService, ratingService });

export { matchService, eloMatchPoolService, questionService, userService, ratingService };
