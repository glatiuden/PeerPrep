import RabbitMQRPQ from "../configs/make-rabbitmq-rpc";
import { matchDbModel } from "../models";

import makeEditorService from "./match";
import makeQuestionService from "./question";

const matchService = makeEditorService({ matchDbModel });
const questionService = makeQuestionService({ exchange: RabbitMQRPQ.getExchange() });

export default Object.freeze({ matchService, questionService });

export { matchService, questionService };
