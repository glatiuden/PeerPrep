import dotenv from "dotenv";
dotenv.config();

import WS from "ws";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import makeLogger from "./src/configs/logs";
import makeDb from "./src/configs/make-db";
import apiRouter from "./src/routes/api";
import adminRouter from "./src/routes/admin";
import makeWebsockets, { cleanup } from "./src/configs/make-websockets";

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

// Initialize sockets & routes
app.use("/editor/api", apiRouter);
app.use("/editor/admin", adminRouter);
app.get(["/", "/editor"], function (req, res) {
  res.send("Editor microservice is running");
});

// Initialize routes & sockets
const PORT = process.env.port || 3004;
const server = http.createServer(app);

if (process.env.NODE_ENV !== "test") {
  const wss = new WS.Server({ noServer: true });

  wss.on("connection", async (ws, req) => {
    await makeWebsockets(ws, req);
  });

  server.on("upgrade", (req: any, socket: any, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  const run = async (): Promise<() => Promise<void>> => {
    await new Promise<void>((resolve) => {
      server.listen(PORT, () => {
        resolve();
      });
    });

    return async () => {
      cleanup();

      await new Promise<void>((resolve) => {
        wss.close(() => {
          resolve();
        });
      });

      await new Promise<void>((resolve) => {
        server.close(() => {
          resolve();
        });
      });
    };
  };

  run().then(() => console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`));
} else {
  server.listen(PORT, () => {
    console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
  });
}

export default app;
