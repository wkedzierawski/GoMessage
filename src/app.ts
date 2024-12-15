import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { RestServer } from "./services/RestServer";
import { SocketServer } from "./services/SocketServer";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const viteLocalHost = "http://localhost:5173";

app.use(cors({ origin: viteLocalHost }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "app_build")));

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: viteLocalHost,
	},
});

new RestServer(app);

new SocketServer(io);

httpServer.listen(PORT);
