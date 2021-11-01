import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { createClient } from "redis";
import { logger } from "./logs";
import { ChatDb } from "../data-access";

export default function makeSockets(server, cors) {
  const io = new Server(server, { transports: ["polling"], cors, path: "/chat/new" });
  const pubClient = createClient("//redis-12661.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:12661", {
    auth_pass: "N4llYIJfuTY48DLszrrow9JGPdWRX19B",
  });
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter({ pubClient, subClient }));
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
      logger.verbose("Code change detected", { match_id });
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
