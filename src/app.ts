import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { RestServer } from "./services/RestServer";
import { SocketServer } from "./services/SocketServer";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

new RestServer(app);

new SocketServer(io);

httpServer.listen(PORT);
