import _ from "lodash";
import jackrabbit from "@pager/jackrabbit";

import { questionService } from "../services";
import { logger } from "./logs";

export default function makeRPCConsumer() {
  const rabbit_url = process.env.RABBIT_URL || "invalid URL";
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
    const question_id = _.get(data, "question_id");
    logger.verbose(`RPC: Received Request from ${requestor} - ${request_type}`, { question_id });

    let result;
    switch (request_type) {
      case "getById":
        result = await questionService.findById({ id: question_id });
        break;
    }

    logger.verbose("RPC: Sending back result...", { result });
    reply({ result });
  };

  rpc.consume(onRequest);
  rpc.on("error", () => makeRPCConsumer());
}
