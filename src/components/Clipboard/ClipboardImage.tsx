import { Box } from "@mui/material";
import { Files } from "../../utils/file";
import { useState } from "react";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { classList } from "../../utils/utils";

type Props = ClipboardElementProps & {
	onError?: () => void;
};

export const ClipboardImage = ({ file, onError, maxHeight }: Props) => {
	const styles = useStyles();

	const [loaded, setLoaded] = useState(false);

	return (
		<Box>
			<img
				className={classList(styles.image, loaded && styles.visible)}
				style={{ maxHeight }}
				src={Files.makeSource(file)}
				onError={onError}
				onLoad={() => setLoaded(true)}
			/>
		</Box>
	);
};

const useStyles = createUseStyles({
	image: {
		maxWidth: "95%",
		opacity: 0,
	},
	visible: {
		opacity: 1,
	},
});
