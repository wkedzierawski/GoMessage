export enum SocketEvent {
	join = "join",
	onMessage = "onMessage",
	sendMessage = "sendMessage",
}

export type SocketFile = { content: File; type: string; name: string };

type User = {
	username: string;
	chatId: string;
};

export type SocketPayload = {
	[SocketEvent.join]: User;
	[SocketEvent.onMessage]: {
		messageId: string;
		date: string;
		message: string;
		chatId: string;
		files: SocketFile[];
		from: string;
		username: string;
	};
	[SocketEvent.sendMessage]: {
		date: string;
		message: string;
		chatId: string;
		files: SocketFile[];
		username: string;
	};
};
