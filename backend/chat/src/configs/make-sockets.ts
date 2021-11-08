import { Server, Socket } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { logger } from "./logs";
import { ChatDb } from "../data-access";
import { corsOptions } from "../middlewares/access-controller-middleware";
import { redisClient } from "./make-redis";

export default function makeSockets(server) {
  const io = new Server(server, {
    cors: corsOptions,
    transports: ["websocket", "polling"],
    allowEIO3: true,
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
    socket.on("room", (room) => {
      socket.join(room);
      logger.verbose("User has connected to the socket");
    });

    socket.on("message", (content) => {
      const { match_id, payload } = content;
      logger.verbose("Message sent", { match_id });
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
