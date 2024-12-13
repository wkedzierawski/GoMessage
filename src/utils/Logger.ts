import dayjs from "dayjs";

export class Logger {
	private static enableLogs = false;

	public static info = (...payload: unknown[]) => {
		if (!this.enableLogs) {
			return;
		}

		console.log(`[${dayjs().format("HH:mm:ss")}]`, ...payload);
	};
}
