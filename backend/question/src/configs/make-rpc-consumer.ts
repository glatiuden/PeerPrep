import _ from "lodash";
import jackrabbit from "@pager/jackrabbit";

import { questionService } from "../services";
import { logger } from "./logs";

export default function makeRPCConsumer() {
  const rabbit_url = process.env.RABBIT_URL;
  if (!rabbit_url) {
    console.warn("RabbitMQ URL not found. RPC is not established");
    return;
  }

  const rabbit = jackrabbit(rabbit_url);
  const exchange = rabbit.default();
  const rpc = exchange.queue({ name: "question", prefetch: 1, durable: false });
  console.log(`Succesfully connected to RabbitMQ (RPC question)`);

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

    logger.verbose("RPC: Sending back result...", { result });
    reply({ result });
  };

  rpc.consume(onRequest);
  rpc.on("error", () => makeRPCConsumer());
}
