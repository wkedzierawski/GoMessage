import { useState } from "react";
import { ClipboardVideo } from "./ClipboardVideo";
import { ClipboardImage } from "./ClipboardImage";

type Props = {
	file: File | ArrayBuffer;
	height: number;
};

export const ClipboardElement = (props: Props) => {
	const [imageError, setImageError] = useState(false);

	if (imageError) {
		return <ClipboardVideo {...props} />;
	}

	return <ClipboardImage onError={() => setImageError(true)} {...props} />;
};
