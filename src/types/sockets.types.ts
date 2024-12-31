export enum SocketEvent {
	onMessage = "onMessage",
	sendMessage = "sendMessage",
}

export type SocketFile = { content: File; type: string };

export type SocketPayload = {
	[SocketEvent.onMessage]: {
		messageId: string;
		date: string;
		message: string;
		chatId: string;
		files: SocketFile[];
		from: string;
	};
	[SocketEvent.sendMessage]: {
		date: string;
		message: string;
		chatId: string;
		files: SocketFile[];
	};
};
