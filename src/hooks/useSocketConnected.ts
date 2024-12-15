import { useEffect, useState } from "react";
import { AppSocket, SocketEvent } from "../services/AppSocket";

export const useSocketConnected = () => {
	const [connected, setConnected] = useState(true);

	useEffect(() => {
		setConnected(AppSocket.connected());

		const listeners = [
			AppSocket.on(SocketEvent.connect, () => setConnected(true)),
			AppSocket.on(SocketEvent.reconnect, () => setConnected(true)),
			AppSocket.on(SocketEvent.disconnect, () => setConnected(false)),
		];

		return () => {
			listeners.forEach((remove) => remove());
		};
	}, []);

	return connected;
};
