import { Box } from "@mui/material";
import { Files } from "../../utils/file";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";

export const ClipboardVideo = ({
	file,
	maxHeight,
	onClickRemove: _onClickRemove,
}: ClipboardElementProps) => {
	const styles = useStyles();

	const onClickRemove = () => {
		if (file instanceof File) {
			_onClickRemove?.(file);
		}
	};
	return (
		<Box className={styles.container}>
			<video
				controls
				className={styles.video}
				style={{ maxHeight }}
				src={Files.makeSource(file)}
			/>
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
