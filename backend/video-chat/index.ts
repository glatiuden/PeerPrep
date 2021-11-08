import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import simple_signal_server from "simple-signal-server";
import accessControlMiddleware from "./middlewares/access-controller-middleware";

const app = express();
app.use(cors(), accessControlMiddleware);
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://peerprep.tech", "https://staging.peerprep.tech", "http://localhost:8082"],
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  path: "/video-chat/new",
});

const nsp = io.of("/video-chat");
const signalServer = new simple_signal_server(nsp);
const rooms = new Map();

const PORT = process.env.port || 3007;
server.listen(PORT, () => {
  console.log("Lobby server running on port " + PORT);
});

app.get(["/", "/video-chat"], function (req, res) {
  let sum = 0;
  rooms.forEach((v, k) => (sum = sum + v.size));
  res.send("Lobby server<br/>rooms: " + rooms.size + "<br/>members: " + sum);
});

signalServer.on("discover", (request) => {
  const memberId = request.socket.id;
  const roomId = request.discoveryData;
  let members = rooms.get(roomId);
  if (!members) {
    members = new Set();
    rooms.set(roomId, members);
  }
  members.add(memberId);
  request.socket.roomId = roomId;
  request.discover({
    peers: Array.from(members),
  });
  console.log("joined " + roomId + " " + memberId);
});

signalServer.on("disconnect", (socket) => {
  const memberId = socket.id;
  const roomId = socket.roomId;
  const members = rooms.get(roomId);
  if (members) {
    members.delete(memberId);
  }
  console.log("left " + roomId + " " + memberId);
});

signalServer.on("request", (request) => {
  request.forward();
  console.log("requested");
});
