import { Box, Button, TextField, TextFieldProps } from "@mui/material";
import { ClipboardEvent, FormEvent, useMemo, useRef, useState } from "react";
import { grey } from "@mui/material/colors";
import { ClipboardElement } from "../Clipboard/ClipboardElement";

type Props = Omit<TextFieldProps, "onSubmit"> & {
	onSubmit: (message: string, images: File[]) => void;
};

export const Input = ({ onSubmit, ...textFieldProps }: Props) => {
	const [files, setFiles] = useState<File[]>([]);

	const textFieldRef = useRef<HTMLInputElement | null>(null);

	const _onSubmit = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

		const text = textFieldRef.current?.value ?? "";

		if (text.length || files.length) {
			onSubmit(text, files);
		}

		if (textFieldRef.current) {
			textFieldRef.current.value = "";
		}

		setFiles([]);
	};

	const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
		try {
			if (!navigator.clipboard) {
				console.error("Clipboard API not available");
				return;
			}

			for (const file of e.clipboardData.files) {
				setFiles((prev) => [...prev, file]);
			}
		} catch (err) {
			console.error("Failed to read clipboard:", err);
		}
	};

	const renderFiles = useMemo(() => {
		return files.map((file) => (
			<ClipboardElement key={file.lastModified} file={file} height={120} />
		));
	}, [files]);

	return (
		<form
			style={{
				display: "flex",
				marginTop: "auto",
				marginBottom: "25px",
				flexDirection: "column",
				padding: "0 25px",
			}}
			onSubmit={_onSubmit}
		>
			<Box
				style={{
					display: "flex",
					marginBottom: 15,
					backgroundColor: grey[700],
					borderRadius: 5,
					width: "fit-content",
					flexWrap: "wrap",
					maxHeight: 150,
					overflowY: "scroll",
				}}
			>
				{renderFiles}
			</Box>
			<Box
				style={{
					display: "flex",
				}}
			>
				<Box
					style={{ paddingRight: 10, paddingLeft: 0 }}
					sx={{
						flex: 1,
						marginTop: "auto",
						marginBottom: 25,
						display: "flex",
						maxHeight: 100,
						margin: 0,
						padding: 0,
						overflowY: "scroll",
						"&::-webkit-scrollbar": {
							display: "none",
						},
					}}
				>
					<TextField
						onPaste={handlePaste}
						inputRef={textFieldRef}
						sx={{
							display: "flex",
							flex: 10,
							color: "white",
							input: {
								color: "whitesmoke",
							},
						}}
						autoComplete="off"
						id="filled-basic"
						variant="outlined"
						size="small"
						{...textFieldProps}
					/>
				</Box>
				<Button onClick={() => _onSubmit()} variant="contained">
					Send
				</Button>
			</Box>
		</form>
	);
};
