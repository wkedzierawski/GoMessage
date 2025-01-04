import { Document, Page } from "react-pdf";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { Box, Skeleton } from "@mui/material";
import { DownloadButton } from "../Chat/DownloadButton";
import { AppTooltip } from "../Chat/AppTooltip";
import { useState } from "react";
import { If } from "../../utils/If";
import { classList } from "../../utils/utils";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { useFilesStore } from "../../store/filesStore";

export const ClipboardPdf = ({
	file,
	maxHeight,
	preview,
	name,
	type,
}: ClipboardElementProps) => {
	const styles = useStyles();

	const [loading, setLoading] = useState(true);

	const removeFile = useFilesStore((state) => state.removeFile);

	const onLoad = () => {
		setLoading(false);
	};

	const onClickRemove = () => {
		if (file instanceof File) {
			removeFile(file);
		}
	};

	return (
		<Box className={styles.container}>
			<AppTooltip title={name} enabled={!preview}>
				<Box>
					<Document
						className={classList(styles.pdf, loading && styles.hidden)}
						file={file}
					>
						<Page
							className={classList(styles.pdfPage, loading && styles.hidden)}
							pageNumber={1}
							height={preview ? maxHeight : undefined}
							onRenderSuccess={onLoad}
						></Page>
					</Document>

					<If condition={loading}>
						<Skeleton
							variant="rectangular"
							className={preview ? styles.skeletonPreview : styles.skeleton}
							animation="wave"
							style={{ maxHeight: preview ? maxHeight : undefined }}
						/>
					</If>

					<If condition={file instanceof File}>
						<ClipboardDeleteButton onClick={onClickRemove} />
					</If>
				</Box>
			</AppTooltip>
			<br />
			<DownloadButton visible={!preview} file={file} name={name} type={type} />
		</Box>
	);
};

const useStyles = createUseStyles({
	container: {
		position: "relative",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	hidden: {
		display: "none",
	},
	pdf: {
		overflow: "hidden",
		maxWidth: "85vw",
	},
	pdfPage: {
		width: "100%",
	},
	skeleton: {
		width: "595px",
		height: "841px",
	},
	skeletonPreview: {
		width: "90px",
		height: "160px",
	},
});
