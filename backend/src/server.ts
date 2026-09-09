import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { env } from "./config/env.js";
import { playersRouter } from "./routes/players.js";
import { pretestRouter } from "./routes/pretest.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { registerSocketHandlers } from "./socket/index.js";

const app = express();
app.use(cors({ origin: env.frontendUrl }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/players", playersRouter);
app.use("/pretest", pretestRouter);

app.use(errorHandler);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: env.frontendUrl },
});
registerSocketHandlers(io);

httpServer.listen(env.port, () => {
  console.log(`Backend rodando em http://localhost:${env.port}`);
});
