import _ from "lodash";
import { Server, Socket } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { logger } from "./logs";
import { redisClient } from "./make-redis";
import { findMatch, cancelMatch, getMatch, findEloMatch, cancelEloMatch } from "../services/use-cases";

export default function makeSockets(server) {
  const io = new Server(server, {
    cors: {
      origin: ["https://peerprep.tech", "https://staging.peerprep.tech", "http://localhost:8082"],
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    path: "/match/new",
  });

  const pubClient = redisClient.redis_client;
  if (!pubClient) {
    console.warn("Redis not initialized. Socket is not established");
    return;
  }
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
  const nsp = io.of("/match");

  if (nsp) {
    console.log("Successfully connected to Socket.IO");
  }

  nsp.on("connection", (socket: Socket) => {
    socket.on("elo_matching", async (payload) => {
      logger.verbose("User started an Elo Match!");
      const match = await findEloMatch(payload);
      const status = _.get(match, "status");
      const elo_match_pool_id = _.get(match, "elo_match_pool_id");
      const socket_id = String(elo_match_pool_id);
      socket.join(socket_id);

      if (status === "matched") {
        const match_id = _.get(match, "match_id");
        if (!match_id) {
          return;
        }
        logger.verbose("Match found! Redirect user to their room now...");
        const match_details = await getMatch(match_id);
        nsp.to(socket_id).emit("matched", match_details);
      } else {
        nsp.to(socket_id).emit("waiting", elo_match_pool_id);
      }
    });

    socket.on("question_matching", async (payload) => {
      logger.verbose("User started a Question Match!");
      const match = await findMatch(payload);
      const status = _.get(match, "status");
      const match_id = _.get(match, "match_id");
      const socket_id = String(match_id);
      if (!match_id) {
        return;
      }
      socket.join(socket_id);
      if (status === "matched") {
        logger.verbose("Match found! Redirect user to their room now...");
        const match_details = await getMatch(match_id);
        nsp.to(socket_id).emit("matched", match_details);
      } else {
        nsp.to(socket_id).emit("waiting", match_id);
      }
    });

    socket.on("question_cancel", async (match_id) => {
      logger.verbose("Match is cancelling...", { match_id });
      const is_cancelled = await cancelMatch(match_id);
      if (is_cancelled) {
        nsp.in(match_id).socketsLeave(match_id);
      }
    });

    socket.on("elo_cancel", async (elo_match_pool_id) => {
      logger.verbose("Match is cancelling...", { elo_match_pool_id });
      const is_cancelled = await cancelEloMatch(elo_match_pool_id);
      if (is_cancelled) {
        nsp.in(elo_match_pool_id).socketsLeave(elo_match_pool_id);
      }
    });
  });
}
