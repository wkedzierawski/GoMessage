export type ClipboardElementProps = {
	file: File | ArrayBuffer;
	type: string;
	name: string;
	maxHeight: number;
	onClickRemove?: (file: File) => void;
	preview?: boolean;
};
