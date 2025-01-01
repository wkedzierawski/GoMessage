import { Tooltip, TooltipProps } from "@mui/material";

type Props = TooltipProps & {
	enabled?: boolean;
};

export const AppTooltip = ({
	enabled = true,
	children,
	title,
	...props
}: Props) => {
	if (!enabled) {
		return children;
	}

	return (
		<Tooltip
			slotProps={{ popper: { disablePortal: true } }}
			title={title}
			{...props}
		>
			{children}
		</Tooltip>
	);
};
