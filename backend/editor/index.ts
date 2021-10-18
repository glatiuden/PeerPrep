import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api/editor";
import adminRouter from "./src/routes/admin/editor";
import makeSockets from "./src/configs/make-sockets";

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
const PORT = process.env.port || 3004;
const server = app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
});

// Initialize sockets & routes
makeSockets(server, corsOptions);
app.use("/editor/api", apiRouter);
app.use("/editor/admin", adminRouter);
app.get("/editor", function (req, res) {
  res.send("Editor microservice is running");
});

export default app;
