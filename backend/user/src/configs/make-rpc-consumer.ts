import _ from "lodash";
import jackrabbit from "@pager/jackrabbit";

import { userService } from "../services";
import { logger } from "./logs";

export default function makeRPCConsumer() {
  const rabbit_url = process.env.RABBIT_URL;
  if (!rabbit_url) {
    console.warn("RabbitMQ URL not found. RPC is not established");
    return;
  }

  const rabbit = jackrabbit(rabbit_url);
  const exchange = rabbit.default();
  const rpc = exchange.queue({ name: "user", prefetch: 1, durable: false });
  console.log(`Succesfully connected to RabbitMQ (RPC User)`);

  const onRequest = async (data, reply) => {
    const requestor = _.get(data, "requestor");
    const request_type = _.get(data, "request_type");
    logger.verbose(`RPC: Received Request from ${requestor} - ${request_type}`);

    let result;
    switch (request_type) {
      case "findById": {
        const user_id = _.get(data, "user_id");
        result = await userService.findById({ id: user_id });
        break;
      }
      case "findByIds": {
        const user_ids = _.get(data, "user_ids");
        result = await userService.findAllByUserIds({ user_ids });
        break;
      }
    }

    logger.verbose("RPC: Sending back result...", { result });
    reply({ result });
  };

  rpc.consume(onRequest);
}
