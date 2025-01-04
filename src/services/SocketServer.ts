import { DefaultEventsMap, Server } from "socket.io";
import { Logger } from "../utils/Logger";
import { SocketEvent, SocketPayload, User } from "../types/sockets.types";
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
			let user: User | null = null;

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
				user = { chatId, username, ...rest };
				const message = `### 🟢 **${username}** joined`;

				Logger.info(message);
				emit(chatId as SocketEvent.onMessage, {
					date: new Date().toString(),
					message,
					chatId,
					files: [],
					messageId: uuidv4(),
					from: "Server",
					username: "Server",
					...rest,
				});
			});

			on(SocketEvent.disconnect, () => {
				if (!user) {
					return;
				}

				const { username, chatId } = user;
				const message = `### 🔴 **${username}** left`;
				Logger.info(message);

				emit(user.chatId as SocketEvent.onMessage, {
					date: new Date().toString(),
					message,
					chatId,
					files: [],
					messageId: uuidv4(),
					from: "Server",
					username: "Server",
				});
			});
		});
	};
}
