import jackrabbit, { Queue, Exchange } from "@pager/jackrabbit";

// export default function makeRPCProducer() {
//   const rabbit_url = process.env.RABBIT_URL || "invalid URL";
//   const rabbit = jackrabbit(rabbit_url);
//   const exchange = rabbit.default();
//   const rpc = exchange.queue({ name: "rpc_queue", prefetch: 1, durable: false });
//   return rpc;
//   rpc.on("ready", () => {
//     exchange.publish(
//       { requestor: "match" },
//       {
//         key: "rpc_queue",
//         reply: onReply, // auto sends necessary info so the reply can come to the exclusive reply-to queue for this rabbit instance
//       },
//     );
//   });
// }

export default class RPCProducer {
  private static rpc_producer_instance: RPCProducer;
  queue!: Queue;
  exchange!: Exchange;

  constructor() {
    if (RPCProducer.rpc_producer_instance) {
      return;
    }
    const RABBIT_URL = process.env.RABBIT_URL || "invalid URL";
    const rabbit = jackrabbit(RABBIT_URL);
    const exchange = rabbit.default();
    const rpc = exchange.queue({ name: "rpc_queue", prefetch: 1, durable: false });
    this.queue = rpc;
    this.exchange = exchange;
    rpc.on("ready", () => {
      console.log("Succesfully connected to RabbitMQ");
    });

    RPCProducer.rpc_producer_instance = this;
  }

  static getInstance(): RPCProducer {
    if (RPCProducer.rpc_producer_instance) {
      return RPCProducer.rpc_producer_instance;
    }

    new RPCProducer();
    return RPCProducer.rpc_producer_instance;
  }
}

const RPCProducerClient = RPCProducer.getInstance();

export { RPCProducerClient };
