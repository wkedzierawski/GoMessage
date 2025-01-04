import { memo } from "react";
import { ClipboardVideo } from "./ClipboardVideo";
import { ClipboardImage } from "./ClipboardImage";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { ClipboardTextFile } from "./ClipboardTextFile";
import { ClipboardFile } from "./ClipboardFile";
import { ClipboardPdf } from "./ClipboardPdf";

export const ClipboardElement = memo((props: ClipboardElementProps) => {
	if (props.type.startsWith("image")) {
		return <ClipboardImage {...props} />;
	}

	if (props.type.startsWith("video")) {
		return <ClipboardVideo {...props} />;
	}

	if (props.type.startsWith("text")) {
		return <ClipboardTextFile {...props} />;
	}

	if (props.type.startsWith("application/pdf")) {
		return <ClipboardPdf {...props} />;
	}

	return <ClipboardFile {...props} />;
});
