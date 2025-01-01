import { Box } from "@mui/material";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";
import { FaFile } from "react-icons/fa";
import { useMemo } from "react";
import { Files } from "../../utils/file";

export const ClipboardTextFile = ({
	file,
	onClickRemove: _onClickRemove,
}: ClipboardElementProps) => {
	const styles = useStyles();

	const onClickRemove = () => {
		if (file instanceof File) {
			_onClickRemove?.(file);
		}
	};

	const text = useMemo(
		() => (file instanceof ArrayBuffer ? Files.arrayBufferToText(file) : null),
		[file]
	);
	return (
		<Box className={styles.container}>
			<If condition={!text}>
				<FaFile size={30} />
			</If>
			<If condition={text}>
				<code> {text}</code>
			</If>
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
