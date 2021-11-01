import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import router from "./src/routes";
import makeSockets from "./src/configs/make-sockets";
import http from "http";
import accessControlMiddleware from "./src/middlewares/access-controller-middleware";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Origin,Accept,Authorization,X-Requested-With",
};

app.use(cors(), accessControlMiddleware);
app.use(bodyParser.json());

makeDb();

// Initialize routes & sockets
const PORT = process.env.port || 3005;
const server = http.createServer(app);

if (process.env.NODE_ENV !== "test") {
  makeSockets(server, corsOptions);
  app.use(makeLogger());
}
app.use("/chat/api", router);
app.get(["/", "/chat"], function (req, res) {
  res.send("Chat microservice is running");
});
server.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

export default app;
