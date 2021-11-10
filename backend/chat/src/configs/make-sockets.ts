import { Server, Socket } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { logger } from "./logs";
import { ChatDb } from "../data-access";
import { redisClient } from "./make-redis";
import { createOrUpdateChat } from "../use-cases/chat";

export default function makeSockets(server) {
  const io = new Server(server, {
    cors: {
      origin: ["https://peerprep.tech", "https://staging.peerprep.tech", "http://localhost:8082"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    path: "/chat/new",
  });

  const pubClient = redisClient.redis_client;
  if (!pubClient) {
    console.warn("Redis not initialized. Socket is not established");
    return;
  }
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
  const nsp = io.of("/chat");

  if (nsp) {
    console.log("Successfully connected to sockets");
  }

  nsp.on("connection", (socket: Socket) => {
    socket.on("room", async (room) => {
      socket.join(room);
      logger.verbose("User has connected to the socket");
      const data_exist_in_cache = await redisClient.getAsync(room);
      if (data_exist_in_cache) {
        nsp.to(room).emit("preload", JSON.parse(data_exist_in_cache));
      }
    });

    socket.on("message", async (content) => {
      const { match_id, payload } = content;
      logger.verbose("Message sent", { match_id });
      const data_exist_in_cache = await redisClient.getAsync(match_id);
      if (data_exist_in_cache) {
        console.log(data_exist_in_cache);
        const data = JSON.parse(data_exist_in_cache) as any[];
        data.push(payload);
        await redisClient.setAsync(match_id, JSON.stringify(data), "EX", 180);
      } else {
        await redisClient.setAsync(match_id, JSON.stringify([payload]), "EX", 180);
      }
      nsp.to(match_id).emit("message", payload);
    });

    socket.on("end_session", async (payload) => {
      const { match_id, content } = payload;
      await ChatDb.insert({
        match_id,
        content,
      });
      logger.verbose("Ending session now...", { match_id });
      nsp.to(match_id).emit("end_session", true);
      nsp.socketsLeave(match_id);
    });
  });
}
