import { Box } from "@mui/material";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";
import { FaFileZipper } from "react-icons/fa6";
import { AppTooltip } from "../Chat/AppTooltip";
import { DownloadButton } from "../Chat/DownloadButton";
import { useFilesStore } from "../../store/filesStore";

export const ClipboardFile = ({
	file,
	name,
	type,
	preview,
}: ClipboardElementProps) => {
	const styles = useStyles();
	const removeFile = useFilesStore((state) => state.removeFile);

	const onClickRemove = () => {
		if (file instanceof File) {
			removeFile(file);
		}
	};

	return (
		<Box className={styles.container}>
			<AppTooltip title={name}>
				<Box>
					<FaFileZipper size={"100%"} />
				</Box>
			</AppTooltip>
			<br />
			<DownloadButton visible={!preview} file={file} name={name} type={type} />
			<If condition={file instanceof File}>
				<ClipboardDeleteButton onClick={onClickRemove} />
			</If>
		</Box>
	);
};

const useStyles = createUseStyles({
	container: {
		position: "relative",
		flex: 1,
		maxWidth: "100px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	text: {
		maxWidth: "98%",
	},
});
