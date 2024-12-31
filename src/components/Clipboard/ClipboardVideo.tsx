import { Box, IconButton } from "@mui/material";
import { Files } from "../../utils/file";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { FaTrash } from "react-icons/fa";
import { createUseStyles } from "react-jss";

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
			{!!onClickRemove && file instanceof File && (
				<IconButton className={styles.button} onClick={onClickRemove}>
					<FaTrash size={15} />
				</IconButton>
			)}
		</Box>
	);
};

const useStyles = createUseStyles({
	container: {
		position: "relative",
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
