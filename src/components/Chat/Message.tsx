import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import { If } from "../../utils/If";
import { ClipboardElement } from "../Clipboard/ClipboardElement";
import { createUseStyles } from "react-jss";
import { SocketFile } from "../../services/AppSocket";
import Markdown from "react-markdown";

export type MessageProps = {
	messageId: string;
	date: string;
	message: string;
	self: boolean;
	files: SocketFile[];
	username: string;
};

export const Message = ({
	message,
	self,
	date,
	files,
	messageId,
	username,
}: MessageProps) => {
	const styles = useStyles();
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const renderFiles = useMemo(() => {
		return files.map((file, index) => (
			<ClipboardElement
				key={`${messageId}-${index}-file`}
				maxHeight={300}
				file={file.content}
				type={file.type}
				name={file.name}
			/>
		));
	}, [files, messageId]);

	return (
		<Paper
			ref={ref}
			className={styles.container}
			style={{
				marginLeft: self ? "auto" : undefined,
				minWidth: message ? "250px" : undefined,
			}}
		>
			<If condition={files.length}>
				<Box className={styles.filesContainer}>{renderFiles}</Box>
			</If>

			<If condition={message}>
				<Box className={styles.textContainer}>
					<Typography className={styles.message} component="div">
						<Markdown>{message}</Markdown>
					</Typography>
				</Box>
			</If>
			<Typography className={styles.date} variant="caption">
				{`${username} | ${dayjs(date).format("HH:mm")}`}
			</Typography>
		</Paper>
	);
};

const useStyles = createUseStyles({
	container: {
		margin: "10px",
		borderRadius: "15px",
		width: "fit-content",
		maxWidth: "calc(100% - 20px)",
		background: grey[900],
		color: "whitesmoke",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		wordBreak: "break-word",
	},
	filesContainer: { padding: "10px" },
	textContainer: { display: "flex", width: "100%" },
	date: {
		alignSelf: "flex-end",
		marginBottom: "2px",
		marginRight: "10px",
		marginLeft: "auto",
		textTransform: "capitalize",
		paddingLeft: "10px",
	},
	message: {
		padding: "10px 20px 0 20px",
		wordBreak: "break-word",
		maxWidth: "650px",
	},
});
