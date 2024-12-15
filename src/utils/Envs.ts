import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(__dirname, "..", "..", ".env") });

export const envs = () => {
	const { PORT = 3000, VITE_SERVER = "", SIZE_LIMIT = "10" } = process.env;

	return { PORT, VITE_SERVER, SIZE_LIMIT };
};
