export type ClipboardElementProps = {
	file: File | ArrayBuffer;
	maxHeight: number;
	onClickRemove?: (file: File) => void;
};
