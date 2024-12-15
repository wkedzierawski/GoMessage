import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { ClipboardImage } from "./ClipboardImage";
import { If } from "../../utils/If";

export type MessageProps = {
	messageId: string;
	date: string;
	message: string;
	self: boolean;
	images: File[];
};

export const Message = ({ message, self, date, images }: MessageProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		console.log({ images });

		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, [images]);

	return (
		<Paper
			ref={ref}
			style={{
				marginLeft: self ? "auto" : undefined,
				minWidth: message ? "250px" : undefined,
			}}
			sx={{
				margin: "10px",
				borderRadius: "15px",
				width: "fit-content",
				background: grey[900],
				color: "whitesmoke",
				display: "flex",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			{images.map((file) => (
				<ClipboardImage file={file} />
			))}
			<Box sx={{ display: "flex", width: "100%" }}>
				<If condition={message}>
					<Typography
						sx={{
							padding: "10px 20px 0 20px",
							wordBreak: "break-word",
							maxWidth: "650px",
						}}
					>
						{message}
					</Typography>
				</If>
			</Box>
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
