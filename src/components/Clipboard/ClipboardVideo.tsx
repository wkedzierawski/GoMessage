import { Box } from "@mui/material";
import { Files } from "../../utils/file";

type Props = {
	file: File | ArrayBuffer;
	height: number;
};

export const ClipboardVideo = ({ file, height }: Props) => {
	return (
		<Box>
			<video
				controls
				style={{ maxWidth: "95%", height, margin: 10 }}
				src={Files.makeSource(file)}
			/>
		</Box>
	);
};
