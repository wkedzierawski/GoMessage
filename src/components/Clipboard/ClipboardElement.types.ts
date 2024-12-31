export type ClipboardElementProps = {
	file: File | ArrayBuffer;
	type: string;
	maxHeight: number;
	onClickRemove?: (file: File) => void;
};
