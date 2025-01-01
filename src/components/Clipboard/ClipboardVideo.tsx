import { Box } from "@mui/material";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";
import { useBlob } from "../../hooks/useBlob";
import { AppTooltip } from "../Chat/AppTooltip";
import { DownloadButton } from "../Chat/DownloadButton";
import { useFilesStore } from "../../store/filesStore";

export const ClipboardVideo = ({
	file,
	name,
	type,
	maxHeight,
	preview,
}: ClipboardElementProps) => {
	const styles = useStyles();

	const source = useBlob(file);
	const removeFile = useFilesStore((state) => state.removeFile);

	const onClickRemove = () => {
		if (file instanceof File) {
			removeFile(file);
		}
	};

	return (
		<Box className={styles.container}>
			<AppTooltip title={name}>
				<video
					controls
					className={styles.video}
					style={{ maxHeight }}
					src={source}
				/>
			</AppTooltip>
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
	},
	video: {
		width: "95%",
	},
	button: {
		display: "flex",
		position: "absolute",
		right: 0,
		top: 0,
	},
});
