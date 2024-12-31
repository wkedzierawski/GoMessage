import {
	Box,
	Button,
	IconButton,
	TextField,
	TextFieldProps,
} from "@mui/material";
import {
	ClipboardEvent,
	FormEvent,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { grey } from "@mui/material/colors";
import { ClipboardElement } from "../Clipboard/ClipboardElement";
import { MdFileUpload } from "react-icons/md";
import { Dropzone } from "../Dropzone";
import { If } from "../../utils/If";
import { createUseStyles } from "react-jss";

type Props = Omit<TextFieldProps, "onSubmit"> & {
	onSubmit: (message: string, images: File[]) => void;
};

const inputColor = "whitesmoke";

export const Input = ({ onSubmit, ...textFieldProps }: Props) => {
	const styles = useStyles();

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
		if (!navigator.clipboard) {
			console.error("Clipboard API not available");
			return;
		}

		for (const paste of e.clipboardData.files) {
			setFiles((prev) => {
				const exists = prev.some((item) => item.name === paste.name);
				if (exists) {
					return prev;
				}

				return [...prev, paste];
			});
		}
	};

	const removeFile = useCallback((file: File) => {
		setFiles((prev) => prev.filter((item) => item !== file));
	}, []);

	const renderFiles = useMemo(() => {
		return files.map((file) => (
			<ClipboardElement
				key={file.name}
				file={file}
				maxHeight={120}
				onClickRemove={removeFile}
			/>
		));
	}, [files, removeFile]);

	return (
		<form className={styles.form} onSubmit={_onSubmit}>
			<If condition={files.length}>
				<Box className={styles.filesContainer}>{renderFiles}</Box>
			</If>
			<Box className={styles.inputContainer}>
				<Box className={styles.textFieldWrapper}>
					<TextField
						onPaste={handlePaste}
						inputRef={textFieldRef}
						className={styles.textField}
						autoComplete="off"
						id="filled-basic"
						variant="filled"
						size="small"
						slotProps={{
							input: {
								style: { color: inputColor },
								endAdornment: (
									<div className={styles.inputEndAdornment}>
										<Dropzone
											onLoad={(file) => {
												setFiles((prev) => [...prev, file]);
											}}
											clickable
										>
											<IconButton>
												<MdFileUpload color={inputColor} />
											</IconButton>
										</Dropzone>
										<Button onClick={() => _onSubmit()} variant="contained">
											Send
										</Button>
									</div>
								),
							},
						}}
						{...textFieldProps}
					/>
				</Box>
			</Box>
		</form>
	);
};

const useStyles = createUseStyles({
	form: {
		display: "flex",
		marginTop: "auto",
		marginBottom: "25px",
		flexDirection: "column",
		padding: "0 25px",
	},
	filesContainer: {
		display: "flex",
		marginBottom: 15,
		backgroundColor: grey[700],
		borderRadius: 5,
		padding: 10,
		width: "fit-content",
		flexWrap: "wrap",
		maxHeight: 150,
		overflowY: "scroll",
		gap: 5,
	},
	inputContainer: {
		display: "flex",
		alignItems: "flex-end",
	},
	textFieldWrapper: {
		flex: 1,
		marginTop: "auto",
		display: "flex",
		maxHeight: 100,
		margin: 0,
		padding: 0,
		overflowY: "scroll",
		paddingRight: 10,
		paddingLeft: 0,
		"&::-webkit-scrollbar": {
			display: "none",
		},
	},
	textField: {
		display: "flex",
		flex: 10,
		input: {
			color: "whitesmoke",
		},
	},
	inputEndAdornment: {
		display: "flex",
		gap: "15px",
	},
});
