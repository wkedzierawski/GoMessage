import { Box } from "@mui/material";
import { Files } from "../../utils/file";
import { useState } from "react";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { classList } from "../../utils/utils";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";

export const ClipboardImage = ({
	file,
	maxHeight,
	onClickRemove: _onClickRemove,
}: ClipboardElementProps) => {
	const styles = useStyles();

	const [loaded, setLoaded] = useState(false);

	const onClickRemove = () => {
		if (file instanceof File) {
			_onClickRemove?.(file);
		}
	};

	return (
		<Box className={styles.container}>
			<img
				className={classList(styles.image, loaded && styles.visible)}
				style={{ maxHeight }}
				src={Files.makeSource(file)}
				onLoad={() => setLoaded(true)}
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
	image: {
		width: "100%",
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
});
