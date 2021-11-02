import _ from "lodash";
import jackrabbit, { Exchange, Queue } from "@pager/jackrabbit";

export default class RabbitMQRPC {
  private static rpc_queues: Queue[] = [];
  private static exchange: Exchange;
  private static publisher: Exchange;

  constructor() {
    const rabbit_url = process.env.RABBIT_URL;
    if (!rabbit_url) {
      console.warn("RabbitMQ URL not found. RPC is not established");
      return;
    }

    const rabbit = jackrabbit(rabbit_url);
    console.log("Setup RabbitMQ RPC...");
    RabbitMQRPC.exchange = rabbit.default();
    RabbitMQRPC.publisher = rabbit.fanout();
    RabbitMQRPC.rpc_queues = []; // Instantiate static array
  }

  createRPCQueue(rpc_name: string) {
    if (!RabbitMQRPC.exchange) {
      throw Error("RabbitMQ has not being instantiated.");
    }
    const rpc = RabbitMQRPC.exchange.queue({ name: rpc_name, prefetch: 1, durable: false });
    rpc.on("ready", () => {
      console.log(`Succesfully connected to RabbitMQ (RPC ${rpc_name})`);
    });
    RabbitMQRPC.rpc_queues.push(rpc);
  }

  static getExchange(): Exchange {
    if (!_.isNil(RabbitMQRPC.exchange)) {
      return RabbitMQRPC.exchange;
    }

    new RabbitMQRPC();
    return RabbitMQRPC.exchange;
  }

  static getPublisher(): Exchange {
    if (!_.isNil(RabbitMQRPC.publisher)) {
      return RabbitMQRPC.publisher;
    }

    new RabbitMQRPC();
    return RabbitMQRPC.publisher;
  }

  static getQueues(): Queue[] {
    if (!_.isEmpty(RabbitMQRPC.rpc_queues)) {
      return RabbitMQRPC.rpc_queues;
    }

    new RabbitMQRPC();
    return RabbitMQRPC.rpc_queues;
  }
}
