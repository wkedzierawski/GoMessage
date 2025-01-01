import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
	onLoad: (file: File) => void;
	children: ReactNode;
	clickable?: boolean;
};

export const Dropzone = ({ children, onLoad, clickable = false }: Props) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			acceptedFiles.forEach((file: File) => {
				const reader = new FileReader();

				reader.onabort = () => console.log("file reading was aborted");
				reader.onerror = () => console.log("file reading has failed");
				reader.onload = () => {
					onLoad(file);
				};
				reader.readAsArrayBuffer(file);
			});
		},
		[onLoad]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noClick: !clickable,
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	);
};
