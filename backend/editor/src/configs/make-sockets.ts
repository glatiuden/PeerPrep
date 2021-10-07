import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { RedisClient } from "redis";
import { logger } from "./logs";

export default function makeSockets(server, cors) {
  const io = new Server(server, { transports: ["websocket", "polling"], cors });
  const pubClient = new RedisClient({ host: "localhost", port: 6379 });
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
  });
}
