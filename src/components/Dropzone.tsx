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
	const updateSkeleton = useFilesStore((state) => state.updateSkeleton);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (clickable) {
				return;
			}

			acceptedFiles.forEach((file: File) => {
				const reader = new FileReader();

				reader.onabort = () => removeSkeleton(file.name);
				reader.onerror = () => removeSkeleton(file.name);
				reader.onload = () => {
					removeSkeleton(file.name);
					onLoad(file);
				};
				reader.onprogress = (event) => {
					updateSkeleton({
						name: file.name,
						progress: Math.floor((event.loaded / event.total) * 100),
					});
				};
				reader.readAsArrayBuffer(file);
			});
		},
		[clickable, onLoad, removeSkeleton, updateSkeleton]
	);

	const onDropAccepted = useCallback(
		(files: File[]) => {
			files.forEach((file) => {
				addSkeleton({ name: file.name, progress: 0 });
			});
		},
		[addSkeleton]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		onDropAccepted: onDropAccepted,
		noClick: !clickable,
	});

	return (
		<div className={className} {...getRootProps()}>
			<input {...getInputProps()} />
			{children}
		</div>
	);
};
