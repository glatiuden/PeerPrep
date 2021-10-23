import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { createClient } from "redis";
import { logger } from "./logs";
import { findMatch } from "../services/use-cases/find-match";
import _ from "lodash";

export default function makeSockets(server, cors) {
  const io = new Server(server, { transports: ["websocket", "polling"], cors });
  const pubClient = createClient({
    port: 6379,
  });

  const subClient = pubClient.duplicate();
  io.adapter(createAdapter({ pubClient, subClient }));

  if (io) {
    console.log("Successfully connected to sockets");
  }

  io.on("connection", (socket: Socket) => {
    logger.verbose("User enqueued");

    socket.on("matching", async (payload) => {
      console.log(payload);
      const match = await findMatch(payload);
      const status = _.get(match, "status");
      const match_id = _.get(match, "match_id");
      console.log(status);
      switch (status) {
        case "waiting": {
          socket.join(match_id);
          logger.verbose("User has connected to the socket");
          break;
        }
        case "matched": {
          logger.verbose("Match found! Redirect user to their room now...");
          socket.join(match_id);
          io.sockets.in(match_id).emit("matched", true);
        }
      }
    });

    socket.on("message", (content) => {
      const { match_id, payload } = content;
      logger.verbose("Code change detected", { match_id });
      io.sockets.in(match_id).emit("message", payload);
    });
  });
}
