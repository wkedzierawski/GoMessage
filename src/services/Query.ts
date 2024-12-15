import { QueryClient } from "@tanstack/react-query";

export enum QueryKey {
	chat = "chat",
}

export const queryClient = new QueryClient();
