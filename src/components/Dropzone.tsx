import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
	onLoad: (file: File) => void;
	children: ReactNode;
};

export const Dropzone = ({ children, onLoad }: Props) => {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			acceptedFiles.forEach((file: File) => {
				const reader = new FileReader();

				reader.onabort = () => console.log("file reading was aborted");
				reader.onerror = () => console.log("file reading has failed");
				reader.onload = () => {
					onLoad(file);
					// Do whatever you want with the file contents
					const binaryStr = reader.result;
					console.log(binaryStr);
				};
				reader.readAsArrayBuffer(file);
			});
		},
		[onLoad]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		noClick: true,
		accept: { "image/*": [], "video/*": [] },
	});

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	);
};
