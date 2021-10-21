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
const rabbit = new makeRabbit();
rabbit.createRPCQueue("question");
rabbit.createRPCQueue("user");

const PORT = process.env.port || 3003;
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize routes
app.use("/match/api", apiRouter);
app.use("/match/admin", adminRouter);

app.get("/match", function (req, res) {
  res.send("Match service is running");
});

export default app;
