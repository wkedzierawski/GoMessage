import { IconButton, Tooltip } from "@mui/material";
import { FaDownload } from "react-icons/fa";
import { createUseStyles } from "react-jss";

type Props = {
	visible: boolean;
	file: File | ArrayBuffer;
	name: string;
	type: string;
};

export const DownloadButton = ({ visible, file, name, type }: Props) => {
	const styles = useStyles();

	const onDownloadClicked = () => {
		const blob = new Blob([file], { type });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	if (!visible) {
		return null;
	}

	return (
		<Tooltip title="Download">
			<IconButton className={styles.container} onClick={onDownloadClicked}>
				<FaDownload />
			</IconButton>
		</Tooltip>
	);
};

const useStyles = createUseStyles({
	container: {
		display: "flex",
		justifySelf: "center",
		position: "absolute",
		top: 0,
		left: 0,
	},
});
