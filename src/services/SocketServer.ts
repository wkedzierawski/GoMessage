import { DefaultEventsMap, Server } from "socket.io";
import { Logger } from "../utils/Logger";
import { SocketEvent, SocketPayload } from "../types/sockets.types";
import { v4 as uuidv4 } from "uuid";

export class SocketServer {
	private io;

	constructor(
		io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
	) {
		this.io = io;
		this.init();
	}

	private init = () => {
		Logger.info("Initialize SocketServer");

		this.io.on("connection", (socket) => {
			Logger.info("Socket connected", socket.id);

			const on = <T extends SocketEvent>(
				event: T,
				callback: (payload: Partial<SocketPayload[T] | undefined>) => void
			) => {
				socket.on(event, callback as never);
			};

			const emit = <T extends SocketEvent>(
				event: T,
				payload: SocketPayload[T]
			) => {
				this.io.emit(event, payload);
			};

			on(SocketEvent.sendMessage, (payload) => {
				Logger.info("Send message event");
				if (!payload?.chatId) {
					return;
				}
				this.io.emit(payload.chatId as SocketEvent.onMessage, {
					...payload,
					messageId: uuidv4(),
					from: socket.id,
				});
			});

			on(SocketEvent.join, ({ chatId, username, ...rest } = {}) => {
				if (!chatId || !username) {
					return;
				}
				Logger.info(`User ${username} joined ${chatId}`);
				emit(chatId as SocketEvent.onMessage, {
					date: new Date().toString(),
					message: `User **${username}** joined chat ${chatId}`,
					chatId,
					files: [],
					messageId: uuidv4(),
					from: "Server",
					username: "Server",
					...rest,
				});
			});
		});
	};
}
