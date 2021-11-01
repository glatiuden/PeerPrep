import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { createClient } from "redis";
import { logger } from "./logs";
import { EditorDb } from "../data-access";

export default function makeSockets(server, cors) {
  const io = new Server(server, { transports: ["websocket", "polling"], cors });
  const REDIS_ENDPOINT = process.env.REDIS_ENDPOINT;
  if (!REDIS_ENDPOINT) {
    console.warn("Redis Endpoint not found. Redis is not established");
    return;
  }

  const pubClient = createClient(REDIS_ENDPOINT, { auth_pass: process.env.REDIS_PASSWORD });
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter({ pubClient, subClient }));

  if (io) {
    console.log("Successfully connected to sockets");
  }

  io.on("connection", (socket: Socket) => {
    socket.on("room", (room) => {
      socket.join(room);
      logger.verbose("User has connected to the socket");
    });

    socket.on("message", (content) => {
      const { match_id, payload } = content;
      logger.verbose("Code change detected", { match_id });
      io.sockets.in(match_id).emit("message", payload);
    });

    socket.on("end_session", async (payload) => {
      const { match_id, content } = payload;
      await EditorDb.insert({
        match_id,
        content,
      });
      logger.verbose("Ending session now...", { match_id });
      io.sockets.in(match_id).emit("end_session", true);
      io.sockets.socketsLeave(match_id);
    });
  });
}
