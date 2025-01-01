import { Box } from "@mui/material";
import { useState } from "react";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { classList } from "../../utils/utils";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { If } from "../../utils/If";
import { useBlob } from "../../hooks/useBlob";
import { AppTooltip } from "../Chat/AppTooltip";
import { DownloadButton } from "../Chat/DownloadButton";

export const ClipboardImage = ({
	file,
	name,
	type,
	maxHeight,
	onClickRemove: _onClickRemove,
	preview,
}: ClipboardElementProps) => {
	const styles = useStyles();

	const [loaded, setLoaded] = useState(false);

	const source = useBlob(file);

	const onClickRemove = () => {
		if (file instanceof File) {
			_onClickRemove?.(file);
		}
	};

	return (
		<Box className={styles.container}>
			<AppTooltip enabled={!preview} title={name}>
				<img
					className={classList(styles.image, loaded && styles.visible)}
					style={{ maxHeight }}
					src={source}
					onLoad={() => setLoaded(true)}
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
		zIndex: 0,
	},
	image: {
		width: "100%",
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
});
