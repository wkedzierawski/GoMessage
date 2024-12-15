import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import { If } from "../../utils/If";
import { ClipboardElement } from "../Clipboard/ClipboardElement";

export type MessageProps = {
	messageId: string;
	date: string;
	message: string;
	self: boolean;
	files: (File | ArrayBuffer)[];
};

export const Message = ({
	message,
	self,
	date,
	files,
	messageId,
}: MessageProps) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	console.log(files);

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
			{files.map((file, index) => (
				<ClipboardElement
					key={`${messageId}-${index}-file`}
					file={file}
					height={300}
				/>
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
				{dayjs(date).format("HH:mm")}
			</Typography>
		</Paper>
	);
};
