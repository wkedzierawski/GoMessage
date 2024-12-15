import { Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";

export type MessageProps = {
	messageId: string;
	date: string;
	message: string;
	self: boolean;
};

export const Message = ({ message, self, date }: MessageProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<Paper
			ref={ref}
			style={{
				marginLeft: self ? "auto" : undefined,
			}}
			sx={{
				margin: "10px",
				borderRadius: "15px",
				width: "fit-content",
				minWidth: "250px",
				background: grey[900],
				color: "whitesmoke",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Typography
				sx={{
					padding: "10px 5px 10px 20px",
					wordBreak: "break-word",
					maxWidth: "650px",
				}}
			>
				{message}
			</Typography>
			<Typography
				sx={{
					alignSelf: "flex-end",
					marginBottom: "2px",
					marginRight: "10px",
					marginLeft: "auto",
				}}
				variant="caption"
			>
				{dayjs(date).format("HH:mm:ss")}
			</Typography>
		</Paper>
	);
};
