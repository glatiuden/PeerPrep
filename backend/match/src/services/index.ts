import RabbitMQRPQ from "../configs/make-rabbitmq-rpc";
import { matchDbModel } from "../models";

import makeEditorService from "./match";
import makeQuestionService from "./question";
import makeUserService from "./user";

const matchService = makeEditorService({ matchDbModel });
const questionService = makeQuestionService({ exchange: RabbitMQRPQ.getExchange() });
const userService = makeUserService({ exchange: RabbitMQRPQ.getExchange() });

export default Object.freeze({ matchService, questionService, userService });

export { matchService, questionService, userService };
