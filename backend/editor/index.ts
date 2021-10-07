import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import router from "./src/routes";
import { Server, Socket } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { RedisClient } from "redis";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Origin,Accept,Authorization,X-Requested-With",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(makeLogger());

makeDb();
const PORT = process.env.port || 3001;
// app.listen(PORT, () => {
//   console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
// });

const server = app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize routes
app.use("/api", router);
app.get("/", function (req, res) {
  res.send("Editor microservice is running");
});

// Initialize Sockets
const io = new Server(server, { transports: ["websocket", "polling"], cors: corsOptions });
const pubClient = new RedisClient({ host: "localhost", port: 6379 });
const subClient = pubClient.duplicate();
io.adapter(createAdapter({ pubClient, subClient }));

io.on("connection", (socket: Socket) => {
  socket.on("join", function (room) {
    console.log(room);
    socket.join(room);
  });
});

export default app;
