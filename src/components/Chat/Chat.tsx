import { Box, Paper, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useMemo, useState } from "react";
import { Message, MessageProps } from "./Message";
import { Input } from "./Input";
import { AppSocket, SocketEvent } from "../../services/AppSocket";
import { useParams } from "react-router-dom";
import { queryClient, QueryKey } from "../../services/Query";
import { Status } from "./Status";
import { useSocketConnected } from "../../hooks/useSocketConnected";
import { useChangeEffect } from "../../hooks/useChangeEffect";

const initMessage = (chatId: string | undefined): MessageProps[] => [
	{
		date: new Date().toISOString(),
		message: `Entered chat: ${chatId}`,
		messageId: "0",
		files: [],
		self: false,
	},
];

export const Chat = () => {
	const { chatId } = useParams();

	const [messages, setMessages] = useState<MessageProps[]>(initMessage(chatId));

	const socketConnected = useSocketConnected();

	useChangeEffect(() => {
		queryClient.invalidateQueries({ queryKey: [QueryKey.chat] });
	}, [socketConnected]);

	useEffect(() => {
		if (!chatId) {
			return;
		}

		const remove = AppSocket.on(chatId as SocketEvent.onMessage, (payload) => {
			if (!payload) {
				return;
			}

			const self = payload.from == AppSocket.getId();

			setMessages((prev) => [...prev, { self, ...payload }]);
		});

		return remove;
	}, [chatId]);

	const renderMessages = useMemo(() => {
		return messages.map((item) => <Message key={item.messageId} {...item} />);
	}, [messages]);

	const sendMessage = (message: string, files: File[]) => {
		if (!chatId) {
			return;
		}

		console.log("Send video", files);

		AppSocket.emit(SocketEvent.sendMessage, {
			date: new Date().toISOString(),
			message,
			chatId,
			files,
		});
	};

	return (
		<Container>
			<Box
				sx={{
					overflowY: "scroll",
					padding: "10px 0",
				}}
			>
				{renderMessages}
			</Box>
			<Input onSubmit={sendMessage} />
			<Status connected={socketConnected} />
		</Container>
	);
};

const Container = styled(Paper)({
	display: "flex",
	flexDirection: "column",
	height: "75vh",
	width: "100%",
	maxWidth: "920px",
	background: grey[800],
	alignItems: "space-between",
});
