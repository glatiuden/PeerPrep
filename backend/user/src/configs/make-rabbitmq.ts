import _ from "lodash";
import jackrabbit from "@pager/jackrabbit";

import { userService } from "../services";
import { logger } from "./logs";

export default function makeRabbitMQ() {
  const rabbit_url = process.env.RABBIT_URL;
  if (!rabbit_url) {
    console.warn("RabbitMQ URL not found. RabbitMQ not initialized");
    return;
  }

  const rabbit = jackrabbit(rabbit_url);

  // Pub/Sub
  const consumer = rabbit.fanout();
  const logs = consumer.queue({ exclusive: true });
  logs.consume(onPubSubConsume, { noAck: true });
  async function onPubSubConsume(data) {
    const request_type = _.get(data, "request_type");
    switch (request_type) {
      case "updateUserElo": {
        const user_id = _.get(data, "user_id");
        const elo = _.get(data, "elo");
        const current_user = await userService.findById({ id: user_id });
        await userService.update({
          _id: user_id,
          elo: current_user?.elo + elo,
          updated_at: new Date(),
        });
        console.log("User: Updated user's elo via Pub/sub");
        break;
      }
    }
  }

  // RPC
  const exchange = rabbit.default();
  const rpc = exchange.queue({ name: "user", prefetch: 1, durable: false });
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
  console.log(`User: Succesfully connected to RabbitMQ`);
}
