import RabbitMQRPQ from "../configs/make-rabbitmq-rpc";
import { matchDbModel, eloMatchPoolDbModel } from "../models";

import makeEditorService from "./match";
import makeQuestionService from "./question";
import makeUserService from "./user";
import makeEloMatchPoolService from "./elo-match-pool";

const matchService = makeEditorService({ matchDbModel });
const eloMatchPoolService = makeEloMatchPoolService({ eloMatchPoolDbModel });

const questionService = makeQuestionService({ exchange: RabbitMQRPQ.getExchange() });
const userService = makeUserService({ exchange: RabbitMQRPQ.getExchange() });

export default Object.freeze({ matchService, eloMatchPoolService, questionService, userService });

export { matchService, eloMatchPoolService, questionService, userService };
