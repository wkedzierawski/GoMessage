import { Express, Request, Response } from "express";
import { Logger } from "../utils/Logger";
import { ApiRoute, ApiRouteResponse } from "../types/api.types";

export class RestServer {
	private app: Express;

	constructor(app: Express) {
		this.app = app;
		this.init();
	}

	private init = () => {
		Logger.info("Initialize RestServer");

		this.app.get("/", (_, res) => {
			res.send("Hello world!");
		});

		this.get(ApiRoute.createChat);
		this.post(ApiRoute.connectChat);
	};

	private get = <T extends ApiRoute>(route: T) =>
		this.app.get(route, this.onRequest[route]);

	private post = <T extends ApiRoute>(route: T) =>
		this.app.post(route, this.onRequest[route]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private onRequest: Record<ApiRoute, (req: Request, res: Response) => any> = {
		[ApiRoute.createChat]: (_, res) => {
			const response: ApiRouteResponse[ApiRoute.createChat] = {
				chatId: this.generateChatId(),
			};

			res.send(response);
		},
		[ApiRoute.connectChat]: (req, res) => {
			const response: ApiRouteResponse[ApiRoute.connectChat] = {
				success: true,
			};

			res.json(response);
		},
	};

	private signs = "ABCDEFGHIJKLMNOPRSTUWXYZ1234567890".split("");

	private generateChatId = (length = 4) => {
		let id = "";
		for (let index = 0; index < length; index++) {
			id += this.signs[Math.floor(Math.random() * this.signs.length)];
		}
		return id;
	};
}
