import axios from "axios";

export enum ApiRouteGet {
	createChat = "/createChat",
}

export enum ApiRoutePost {
	connectChat = "/connectChat",
}

export type ApiRoutePayload = {
	[ApiRoutePost.connectChat]: {
		chatId: string;
	};
};

export type ApiRouteResponse = {
	[ApiRouteGet.createChat]: {
		chatId: string;
	};
	[ApiRoutePost.connectChat]: {
		success: boolean;
	};
};

class Axios {
	private BASE_URL = "http://localhost:3000";
	private axios = axios.create({ baseURL: this.BASE_URL });

	public get = <T extends ApiRouteGet>(url: T) => {
		return this.axios.get<ApiRouteResponse[T]>(url);
	};

	public post = <T extends ApiRoutePost>(
		url: T,
		payload: ApiRoutePayload[T]
	) => {
		return this.axios.post<ApiRouteResponse[T]>(url, payload);
	};
}

export const AppAxios = new Axios();
