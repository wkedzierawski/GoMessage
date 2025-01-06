import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Skeleton,
	TextField,
	TextFieldProps,
} from "@mui/material";
import { ClipboardEvent, FormEvent, useMemo, useRef } from "react";
import { grey } from "@mui/material/colors";
import { ClipboardElement } from "../Clipboard/ClipboardElement";
import { MdFileUpload } from "react-icons/md";
import { Dropzone } from "../Dropzone";
import { If } from "../../utils/If";
import { createUseStyles } from "react-jss";
import { useFilesStore } from "../../store/filesStore";
import { mobileMaxWidth } from "../../utils/consts";

type Props = Omit<TextFieldProps, "onSubmit"> & {
	onSubmit: (message: string, images: File[]) => void;
};

const inputColor = "whitesmoke";

export const Input = ({ onSubmit, ...textFieldProps }: Props) => {
	const styles = useStyles();

	const files = useFilesStore((state) => state.files);
	const addFile = useFilesStore((state) => state.addFile);
	const clearFiles = useFilesStore((state) => state.clearFiles);

	const skeletons = useFilesStore((state) => state.skeletons);

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

		clearFiles();
	};

	const handlePaste = async (e: ClipboardEvent<HTMLDivElement>) => {
		if (!navigator.clipboard) {
			console.error("Clipboard API not available");
			return;
		}

		for (const paste of e.clipboardData.files) {
			const exists = files.some((item) => item.name === paste.name);
			if (exists) {
				continue;
			}

			addFile(paste);
		}
	};

	const renderFiles = useMemo(() => {
		return files.map((file) => (
			<ClipboardElement
				key={file.name}
				file={file}
				maxHeight={120}
				type={file.type}
				name={file.name}
				preview
			/>
		));
	}, [files]);

	const renderSkeletons = useMemo(() => {
		return skeletons.map((item) => (
			<Box key={item.name} className={styles.skeletonContainer}>
				<Skeleton
					variant="rectangular"
					animation="wave"
					width={200}
					height={120}
				></Skeleton>
				<CircularProgress
					className={styles.skeletonProgress}
					variant="determinate"
					value={item.progress}
				/>
			</Box>
		));
	}, [skeletons, styles.skeletonContainer, styles.skeletonProgress]);

	return (
		<form className={styles.form} onSubmit={_onSubmit}>
			<Box className={styles.filesWrapper}>
				<If condition={files.length}>
					<Box className={styles.filesContainer}>{renderFiles}</Box>
				</If>
				<If condition={skeletons.length}>
					<Box className={styles.skeletonsContainer}>{renderSkeletons}</Box>
				</If>
			</Box>
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
										<Dropzone onLoad={addFile} clickable>
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
		[`@media (max-width:${mobileMaxWidth})`]: {
			padding: "0",
		},
	},
	filesWrapper: {
		display: "flex",
		gap: 5,
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
	skeletonsContainer: {
		display: "flex",
		marginBottom: 15,
		backgroundColor: grey[700],
		borderRadius: 5,
		padding: 10,
		width: "fit-content",
		flexWrap: "wrap",
		overflowY: "scroll",
		gap: 5,
	},
	skeletonContainer: {
		position: "relative",
	},
	skeletonProgress: {
		position: "absolute",
		left: "40%",
		top: "35%",
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
