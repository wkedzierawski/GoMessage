import { Box } from "@mui/material";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";
import { useMemo } from "react";
import { Files } from "../../utils/file";
import { useFilesStore } from "../../store/filesStore";
import { BsFiletypeTxt } from "react-icons/bs";

export const ClipboardTextFile = ({ file }: ClipboardElementProps) => {
	const styles = useStyles();
	const removeFile = useFilesStore((state) => state.removeFile);

	const onClickRemove = () => {
		if (file instanceof File) {
			removeFile?.(file);
		}
	};

	const text = useMemo(
		() => (file instanceof ArrayBuffer ? Files.arrayBufferToText(file) : null),
		[file]
	);
	return (
		<Box className={styles.container}>
			<If condition={!text}>
				<BsFiletypeTxt size={120} />
			</If>
			<If condition={text}>
				<code>{text}</code>
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
