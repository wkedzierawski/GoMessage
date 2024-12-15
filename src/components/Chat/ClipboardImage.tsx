import { Box } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
	file: File | ArrayBuffer;
};

function _arrayBufferToBase64(buffer: ArrayBuffer) {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

export const ClipboardImage = ({ file }: Props) => {
	const [buffer, setBuffer] = useState<string>();

	useEffect(() => {
		if ("arrayBuffer" in file) {
			file.arrayBuffer().then((res) => setBuffer(_arrayBufferToBase64(res)));
			return;
		}
		setBuffer(_arrayBufferToBase64(file));
	}, [file]);

	if (!buffer) {
		return null;
	}

	return (
		<Box>
			<img
				style={{ maxWidth: "95%", margin: 10 }}
				src={`data:image/jpeg;base64, ` + buffer}
			/>
		</Box>
	);
};
