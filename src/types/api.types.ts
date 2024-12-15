export enum ApiRoute {
	// GET
	createChat = "/createChat",
	// POST
	connectChat = "/connectChat",
}

export type ApiRouteResponse = {
	[ApiRoute.createChat]: {
		chatId: string;
	};
	[ApiRoute.connectChat]: {
		success: boolean;
	};
};
