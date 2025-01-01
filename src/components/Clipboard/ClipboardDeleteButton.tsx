import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { FaTrash } from "react-icons/fa";
import { createUseStyles } from "react-jss";

type Props = {
	onClick: () => void;
};

export const ClipboardDeleteButton = ({ onClick }: Props) => {
	const styles = useStyles();

	return (
		<IconButton className={styles.button} onClick={onClick}>
			<FaTrash size={15} />
		</IconButton>
	);
};

const useStyles = createUseStyles({
	button: {
		display: "flex",
		position: "absolute",
		right: 0,
		top: 0,
		color: "whitesmoke",
		transition: "300ms ease color",
		"&:hover": {
			color: red[500],
		},
	},
});
