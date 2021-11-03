import _ from "lodash";
import jackrabbit from "@pager/jackrabbit";

import { questionService } from "../services";
import { logger } from "./logs";

export default function makeRabbitMQ() {
  const rabbit_url = process.env.RABBIT_URL;
  if (!rabbit_url) {
    console.warn("RabbitMQ URL not found. RPC is not established");
    return;
  }

  const rabbit = jackrabbit(rabbit_url);

  // Pub/Sub
  const consumer = rabbit.fanout();
  const logs = consumer.queue({ exclusive: true, prefetch: 1 });
  logs.consume(onPubSubConsume, { noAck: true });
  async function onPubSubConsume(data) {
    const request_type = _.get(data, "request_type");
    switch (request_type) {
      case "updateQuestionAttemptCount": {
        const question_id = _.get(data, "question_id");
        const question = await questionService.findById({ id: question_id });
        if (!question) {
          logger.error(`Question by ${question_id} not found.`);
          break;
        }
        await questionService.update({
          _id: question_id,
          number_of_attempts: question.number_of_attempts + 1,
          updated_at: new Date(),
        });
        logger.verbose("Question MS: Updated question's attempt count via Pub/Sub");
        break;
      }
    }
  }

  // RPC
  const exchange = rabbit.default();
  const rpc = exchange.queue({ name: "question", prefetch: 1, durable: false });
  const onRequest = async (data, reply) => {
    const requestor = _.get(data, "requestor");
    const request_type = _.get(data, "request_type");
    logger.verbose(`RPC: Received Request from ${requestor} - ${request_type}`);

    let result;
    switch (request_type) {
      case "findById":
        const question_id = _.get(data, "question_id");
        result = await questionService.findById({ id: question_id });
        break;
      case "findByDifficultyAndTopic":
        const difficulty = _.get(data, "difficulty");
        const topic = _.get(data, "topic");
        result = await questionService.findByDifficultyAndTopic({ difficulty, topic });
        break;
    }

    logger.verbose("RPC: Sending back result...", { request_type });
    reply({ result });
  };

  rpc.consume(onRequest);
  rpc.on("error", () => makeRabbitMQ());
  console.log(`Question MS: Succesfully connected to RabbitMQ`);
}
