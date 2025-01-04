import { DefaultEventsMap, Server } from "socket.io";
import { Logger } from "../utils/Logger";
import { SocketEvent, SocketPayload, User } from "../types/sockets.types";
import { v4 as uuidv4 } from "uuid";

export class SocketServer {
	private io;

	private online = new Map<string, number>();

	constructor(
		io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
	) {
		this.io = io;
		this.init();
	}

	private onUserJoin = (chatId: string) => {
		const prev = this.online.get(chatId) || 0;
		this.online.set(chatId, prev + 1);
	};

	private onUserLeave = (chatId: string) => {
		const prev = this.online.get(chatId) || 0;
		const next = Math.max(0, prev - 1);

		if (!next) {
			this.online.delete(chatId);
			return;
		}

		this.online.set(chatId, next);
	};

	private getOnlineUsers = (chatId: string) => this.online.get(chatId) || 0;

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
				if (!user?.chatId) {
					return;
				}
				this.io.to(user.chatId).emit(event, payload);
			};

			on(SocketEvent.sendMessage, async (payload) => {
				Logger.info("Send message event");
				if (!payload?.chatId) {
					return;
				}

				this.io.to(payload.chatId).emit(SocketEvent.onMessage, {
					...payload,
					messageId: uuidv4(),
					from: socket.id,
				});
			});

			on(SocketEvent.join, async ({ chatId, username, ...rest } = {}) => {
				if (!chatId || !username) {
					return;
				}

				user = { chatId, username, ...rest };
				this.onUserJoin(chatId);
				await socket.join(chatId);

				const message = `### 🟢 **${username}** joined`;
				Logger.info(message);

				emit(SocketEvent.onMessage, {
					date: new Date().toString(),
					message,
					chatId,
					files: [],
					messageId: uuidv4(),
					from: "Server",
					username: "Server",
					...rest,
				});

				emit(
					SocketEvent.online,
					this.io.sockets.adapter.rooms.get(chatId)?.size || 0
				);
			});

			on(SocketEvent.disconnect, () => {
				if (!user) {
					return;
				}

				const { username, chatId } = user;
				this.onUserLeave(chatId);

				const message = `### 🔴 **${username}** left`;
				Logger.info(message);

				emit(SocketEvent.onMessage, {
					date: new Date().toString(),
					message,
					chatId,
					files: [],
					messageId: uuidv4(),
					from: "Server",
					username: "Server",
				});

				emit(
					SocketEvent.online,
					this.io.sockets.adapter.rooms.get(chatId)?.size || 0
				);
			});
		});
	};
}
