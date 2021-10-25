import _ from "lodash";
import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { logger } from "./logs";
import { redisClient } from "./make-redis";
import { findMatch, cancelMatch, getMatch, findEloMatch } from "../services/use-cases";

export default function makeSockets(server, cors) {
  const io = new Server(server, { transports: ["websocket", "polling"], cors });
  // const pubClient = createClient({
  //   port: 6379,
  // });

  const pubClient = redisClient.redis_client;
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter({ pubClient, subClient }));

  if (io) {
    console.log("Successfully connected to sockets");
  }

  io.on("connection", (socket: Socket) => {
    logger.verbose("User enqueued");

    socket.on("elo_matching", async (payload) => {
      const match = await findEloMatch(payload);
      const status = _.get(match, "status");
      const match_id = _.get(match, "match_id");
      socket.join(match_id);
      if (status === "matched") {
        logger.verbose("Match found! Redirect user to their room now...");
        const match_details = await getMatch(match_id);
        io.sockets.in(match_id).emit("matched", match_details);
      } else {
        io.sockets.in(match_id).emit("waiting", match_id);
      }
    });

    socket.on("matching", async (payload) => {
      const match = await findMatch(payload);
      const status = _.get(match, "status");
      const match_id = _.get(match, "match_id");
      socket.join(match_id);
      if (status === "matched") {
        logger.verbose("Match found! Redirect user to their room now...");
        const match_details = await getMatch(match_id);
        io.sockets.in(match_id).emit("matched", match_details);
      } else {
        io.sockets.in(match_id).emit("waiting", match_id);
      }
    });

    socket.on("cancel", async (match_id) => {
      logger.verbose("Match is cancelling...", { match_id });
      const is_cancelled = await cancelMatch(match_id);
      if (is_cancelled) {
        io.sockets.in(match_id).socketsLeave(match_id);
      }
    });
  });
}
