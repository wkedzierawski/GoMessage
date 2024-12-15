import { io } from "socket.io-client";

export enum SocketEvent {
	connect = "connect",
	reconnect = "reconnect",
	disconnect = "disconnect",
	onMessage = "onMessage",
	sendMessage = "sendMessage",
}

export type SocketPayload = {
	[SocketEvent.connect]: unknown;
	[SocketEvent.reconnect]: unknown;
	[SocketEvent.disconnect]: unknown;
	[SocketEvent.onMessage]: {
		messageId: string;
		date: string;
		message: string;
		chatId: string;
		files: File[];
		from: string;
	};
	[SocketEvent.sendMessage]: {
		date: string;
		message: string;
		chatId: string;
		files: File[];
	};
};

class Socket {
	private socket: ReturnType<typeof io>;

	constructor() {
		this.socket = io(import.meta.env.DEV ? "//localhost:3000" : "/", {
			reconnectionDelayMax: 10000,
		});
	}

	public emit = <T extends SocketEvent>(
		event: T,
		payload: SocketPayload[T]
	) => {
		this.socket.emit(event, payload);
	};

	public on = <T extends SocketEvent>(
		event: T,
		callback: (e: SocketPayload[T] | undefined) => void
	) => {
		this.socket.on(event, callback as never);

		return () => {
			this.socket.removeListener(event, callback as never);
		};
	};

	public getId = () => this.socket.id;

	public connected = () => this.socket.connected;
}

export const AppSocket = new Socket();
