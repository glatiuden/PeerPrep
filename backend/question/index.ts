import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api";
import adminRouter from "./src/routes/admin";
import makeRabbit from "./src/configs/make-rabbitmq";
import makeRedis from "./src/configs/make-redis";

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
  makeRabbit();
  new makeRedis();
}

makeDb();
const PORT = process.env.port || 3002;
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize routes
app.use("/question/api", apiRouter);
app.use("/question/admin", adminRouter);
app.get(["/", "/question"], function (req, res) {
  res.send("Question microservice is running");
});

export default app;
