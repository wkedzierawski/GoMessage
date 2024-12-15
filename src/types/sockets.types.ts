export enum SocketEvent {
	onMessage = "onMessage",
	sendMessage = "sendMessage",
}

export type SocketPayload = {
	[SocketEvent.onMessage]: {
		messageId: string;
		date: string;
		message: string;
		chatId: string;
		from: string;
	};
	[SocketEvent.sendMessage]: {
		date: string;
		message: string;
		chatId: string;
	};
};
