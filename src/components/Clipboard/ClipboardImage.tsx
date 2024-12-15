import { Box } from "@mui/material";
import { Files } from "../../utils/file";
import { useState } from "react";

type Props = {
	file: File | ArrayBuffer;
	onError?: () => void;
	height: number;
};

export const ClipboardImage = ({ file, onError, height }: Props) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<Box>
			<img
				style={{
					maxWidth: "95%",
					margin: 10,
					opacity: loaded ? 1 : 0,
					height,
				}}
				src={Files.makeSource(file)}
				onError={onError}
				onLoad={() => setLoaded(true)}
			/>
		</Box>
	);
};
