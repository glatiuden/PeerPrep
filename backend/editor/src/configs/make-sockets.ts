import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { createClient } from "redis";
import { logger } from "./logs";

export default function makeSockets(server, cors) {
  const io = new Server(server, { transports: ["websocket", "polling"], cors });
  // const pubClient = createClient({
  //   host: "redis-cluster.m5lsme.0001.apse1.cache.amazonaws.com",
  //   port: 6379,
  // });
  const pubClient = createClient("//redis-10500.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:10500", {
    auth_pass: "Os7l8NqAmborLVL9tkfjnDm76DKPwFKw",
  });

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

    socket.on("end_session", (match_id) => {
      logger.verbose("Ending session now...", { match_id });
      io.sockets.in(match_id).socketsLeave(match_id);
    });
  });
}
