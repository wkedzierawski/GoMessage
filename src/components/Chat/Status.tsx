import { LinearProgress } from "@mui/material";

type Props = {
	connected: boolean;
};
export const Status = ({ connected }: Props) => {
	if (!connected) {
		return <LinearProgress variant="query" color="warning" />;
	}

	return <LinearProgress variant="determinate" value={100} color={"success"} />;
};
