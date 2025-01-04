import { useEffect, useState } from "react";
import { AppSocket, SocketEvent } from "../../services/AppSocket";
import { Box } from "@mui/material";
import { createUseStyles } from "react-jss";
import { FaInfoCircle } from "react-icons/fa";
import { AppTooltip } from "./AppTooltip";
import { grey } from "@mui/material/colors";

export const OnlineCounter = () => {
	const styles = useStyles();
	const [onlineCounter, setOnlineCounter] = useState(0);

	useEffect(() => {
		const remove = AppSocket.on(
			SocketEvent.online,
			(counter) => counter && setOnlineCounter(counter)
		);

		return remove;
	}, []);

	const message = `Online users: ${onlineCounter}`;

	return (
		<AppTooltip title={message}>
			<Box className={styles.container}>
				<FaInfoCircle size={25} />
			</Box>
		</AppTooltip>
	);
};

const useStyles = createUseStyles({
	container: {
		position: "absolute",
		right: "10px",
		top: "10px",
		display: "flex",
		alignItems: "center",
		gap: 5,
		color: "whitesmoke",
		transition: "300ms ease color",
		"&:hover": {
			color: grey[400],
		},
		"@media (max-width:600px)": {
			display: "none",
		},
	},
});
