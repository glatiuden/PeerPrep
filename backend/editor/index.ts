import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import makeSockets from "./src/configs/make-sockets";
import router from "./src/routes";

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

// Initialize routes & sockets
const PORT = process.env.port || 3001;
const server = app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

makeSockets(server, corsOptions);
app.use("/api", router);
app.get("/", function (req, res) {
  res.send("Editor microservice is running");
});

export default app;
