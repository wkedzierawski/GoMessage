import { Button, Container, TextField, TextFieldProps } from "@mui/material";
import { FormEvent, useRef } from "react";

type Props = Omit<TextFieldProps, "onSubmit"> & {
	onSubmit: (message: string) => void;
};

export const Input = ({ onSubmit, ...textFieldProps }: Props) => {
	const textFieldRef = useRef<HTMLInputElement | null>(null);

	const _onSubmit = (e?: FormEvent<HTMLFormElement>) => {
		e?.preventDefault();
		if (!textFieldRef.current || !textFieldRef.current.value.length) {
			return;
		}
		onSubmit(textFieldRef.current.value);
		textFieldRef.current.value = "";
	};

	return (
		<form
			style={{
				display: "flex",
				marginTop: "auto",
				marginBottom: "25px",
				flexDirection: "row",
				padding: "0 25px",
			}}
			onSubmit={_onSubmit}
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
					inputRef={textFieldRef}
					autoComplete="off"
					id="filled-basic"
					variant="outlined"
					size="small"
					sx={{
						display: "flex",
						flex: 10,
						color: "white",
						input: {
							color: "whitesmoke",
						},
					}}
					{...textFieldProps}
				/>
			</Container>
			<Button onClick={() => _onSubmit()} sx={{ flex: 1 }} variant="contained">
				Send
			</Button>
		</form>
	);
};
