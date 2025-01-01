import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFilesStore } from "../store/filesStore";

type Props = {
	className?: string;
	onLoad: (file: File) => void;
	children: ReactNode;
	clickable?: boolean;
};

export const Dropzone = ({
	className,
	children,
	onLoad,
	clickable = false,
}: Props) => {
	const addSkeleton = useFilesStore((state) => state.addSkeleton);
	const removeSkeleton = useFilesStore((state) => state.removeSkeleton);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (clickable) {
				return;
			}

			acceptedFiles.forEach((file: File) => {
				const reader = new FileReader();

				reader.onabort = () => removeSkeleton();
				reader.onerror = () => removeSkeleton();
				reader.onload = () => {
					removeSkeleton();
					onLoad(file);
				};
				reader.onprogress = (event) => {
					console.log(`Progress ${event.loaded} / ${event.total}`);
				};
				reader.readAsArrayBuffer(file);
			});
		},
		[clickable, onLoad, removeSkeleton]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		onDropAccepted: addSkeleton,
		noClick: !clickable,
	});

	return (
		<div className={className} {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	);
};
