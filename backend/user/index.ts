import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api";
import adminRouter from "./src/routes/admin";
import makeRabbitMQ from "./src/configs/make-rabbitmq";
import accessControlMiddleware from "./src/middleware/access-controller-middleware";

const app = express();

app.use(cors(), accessControlMiddleware);
app.use(bodyParser.json());
if (process.env.NODE_ENV !== "test") {
  app.use(makeLogger());
  makeRabbitMQ();
}

makeDb();
const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize routes
app.use("/user/api", apiRouter);
app.use("/user/admin", adminRouter);
app.get(["/", "/user"], function (req, res) {
  res.send("User Microservice is running");
});

export default app;
