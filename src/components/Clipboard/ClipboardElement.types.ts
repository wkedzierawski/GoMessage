export type ClipboardElementProps = {
	file: File | ArrayBuffer;
	type: string;
	name: string;
	maxHeight: number;
	preview?: boolean;
};
