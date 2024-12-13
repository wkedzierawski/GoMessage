import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Logger } from "./utils/Logger";

const app = express();

app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (_, res) => {
	res.send("Hello world!");
});

io.on("connection", () => {
	Logger.info("Socket connected");
});

httpServer.listen(3000);
