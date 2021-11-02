import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api";
import adminRouter from "./src/routes/admin";
import makeRabbit from "./src/configs/make-rabbitmq-rpc";
import makeSockets from "./src/configs/make-sockets";
import makeRedis from "./src/configs/make-redis";
import http from "http";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Origin,Accept,Authorization,X-Requested-With",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
if (process.env.NODE_ENV !== "test") {
  app.use(makeLogger());
}

makeDb();
// new makeRedis();
// const rabbit = new makeRabbit();
//rabbit.createRPCQueue("question");
//rabbit.createRPCQueue("user");

const PORT = process.env.port || 3003;
// const server = app.listen(PORT, () => {
//   console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
// });
const server = http.createServer(app);

// Initialize routes
//makeSockets(server, corsOptions);
app.use("/match/api", apiRouter);
app.use("/match/admin", adminRouter);

app.get("/match", function (req, res) {
  res.send("Match microservice is running");
});
app.get("/", function (req, res) {
  res.send("Match microservice is running");
});
server.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});
export default app;
