import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { RestServer } from "./services/RestServer";
import { SocketServer } from "./services/SocketServer";
import { join } from "path";
import { envs } from "./utils/Envs";

const app = express();
const { PORT, VITE_SERVER, SIZE_LIMIT } = envs();

app.use(cors({ origin: VITE_SERVER }));
app.use(express.json());

app.use(express.static(join(__dirname, "..", "app_build")));

const httpServer = createServer(app);
const io = new Server(httpServer, {
	maxHttpBufferSize: Number(`${SIZE_LIMIT}e8`),
	cors: {
		origin: VITE_SERVER,
	},
});

new RestServer(app);

new SocketServer(io);

httpServer.listen(PORT);
