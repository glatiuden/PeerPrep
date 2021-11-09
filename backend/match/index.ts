import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api";
import adminRouter from "./src/routes/admin";
import makeSockets from "./src/configs/make-sockets";
import makeRedis from "./src/configs/make-redis";
import http from "http";
import accessControlMiddleware from "./src/middlewares/access-controller-middleware";
import adminTokenValidatorMiddleware from "./src/middlewares/admin-token-validator-middleware";

const app = express();
app.use(cors(), accessControlMiddleware);
app.use(bodyParser.json());
makeDb();

const PORT = process.env.port || 3003;
const server = http.createServer(app);
if (process.env.NODE_ENV !== "test") {
  app.use(makeLogger());
  new makeRedis();
  makeSockets(server);
}

// Initialize routes
app.use("/match/api", apiRouter);
app.use("/match/admin", adminTokenValidatorMiddleware, adminRouter);

app.get(["/", "/match"], function (req, res) {
  res.send("Match microservice is running");
});

server.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});
export default app;
