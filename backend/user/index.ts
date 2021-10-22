import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api";
import adminRouter from "./src/routes/admin";
import makeRabbit from "./src/configs/make-rpc-consumer";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Origin,Accept,Authorization,X-Requested-With",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(makeLogger());
makeRabbit();
makeDb();
const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize routes
app.use("/user/api", apiRouter);
app.use("/user/admin", adminRouter);

app.get("/user", function (req, res) {
  res.send("User Microservice is running");
});

export default app;
