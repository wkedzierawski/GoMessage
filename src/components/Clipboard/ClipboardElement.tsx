import { memo, useState } from "react";
import { ClipboardVideo } from "./ClipboardVideo";
import { ClipboardImage } from "./ClipboardImage";
import { ClipboardElementProps } from "./ClipboardElement.types";

export const ClipboardElement = memo((props: ClipboardElementProps) => {
	const [imageError, setImageError] = useState(false);

	if (imageError) {
		return <ClipboardVideo {...props} />;
	}

	return <ClipboardImage onError={() => setImageError(true)} {...props} />;
});
