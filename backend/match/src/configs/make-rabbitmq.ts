import _ from "lodash";
import jackrabbit, { Exchange } from "@pager/jackrabbit";

export default class RabbitMQ {
  private static exchange: Exchange;
  private static publisher: Exchange;

  constructor() {
    const rabbit_url = process.env.RABBIT_URL;
    if (!rabbit_url) {
      console.warn("RabbitMQ URL not found. RPC is not established");
      return;
    }

    const rabbit = jackrabbit(rabbit_url);
    console.log("Setup RabbitMQ...");
    RabbitMQ.exchange = rabbit.default(); // For RPC
    RabbitMQ.publisher = rabbit.fanout(); // For Pub/Sub
    console.log("Successfully connected to RabbitMQ");
  }

  static getExchange(): Exchange {
    if (!_.isNil(RabbitMQ.exchange)) {
      return RabbitMQ.exchange;
    }

    new RabbitMQ();
    return RabbitMQ.exchange;
  }

  static getPublisher(): Exchange {
    if (!_.isNil(RabbitMQ.publisher)) {
      return RabbitMQ.publisher;
    }

    new RabbitMQ();
    return RabbitMQ.publisher;
  }
}

const rpcClient = RabbitMQ.getExchange();
const pubsubClient = RabbitMQ.getPublisher();

export { rpcClient, pubsubClient };
