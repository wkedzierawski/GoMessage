import {
	Box,
	Button,
	Container,
	TextField,
	TextFieldProps,
} from "@mui/material";
import { ClipboardEvent, FormEvent, useRef, useState } from "react";
import { ClipboardImage } from "./ClipboardImage";
import { grey } from "@mui/material/colors";

type Props = Omit<TextFieldProps, "onSubmit"> & {
	onSubmit: (message: string, images: File[]) => void;
};

export const Input = ({ onSubmit, ...textFieldProps }: Props) => {
	const [images, setImages] = useState<File[]>([]);

	const textFieldRef = useRef<HTMLInputElement | null>(null);

	const _onSubmit = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();

		const text = textFieldRef.current?.value ?? "";

		if (text.length || images.length) {
			onSubmit(text, images);
		}

		if (textFieldRef.current) {
			textFieldRef.current.value = "";
		}

		setImages([]);
	};

	const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
		try {
			if (!navigator.clipboard) {
				console.error("Clipboard API not available");
				return;
			}

			for (const file of e.clipboardData.files) {
				const isImage = file.type.startsWith("image/");
				if (!isImage) {
					return;
				}
				const buffer = await file.arrayBuffer();
				console.log({ file, isImage, buffer });

				setImages((prev) => [...prev, file]);
			}
		} catch (err) {
			console.error("Failed to read clipboard:", err);
		}
	};

	return (
		<>
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
					{images.map((file) => (
						<ClipboardImage key={file.lastModified} file={file} />
					))}
				</Box>
				<Box
					style={{
						display: "flex",
					}}
				>
					<Container
						style={{ paddingRight: 10, paddingLeft: 0 }}
						sx={{
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
					</Container>
					<Button
						onClick={() => _onSubmit()}
						sx={{ flex: 1 }}
						variant="contained"
					>
						Send
					</Button>
				</Box>
			</form>
		</>
	);
};
