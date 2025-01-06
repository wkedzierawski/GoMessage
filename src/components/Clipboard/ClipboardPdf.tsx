import { Document, Page } from "react-pdf";
import { ClipboardElementProps } from "./ClipboardElement.types";
import { createUseStyles } from "react-jss";
import { Box, IconButton, Skeleton } from "@mui/material";
import { DownloadButton } from "../Chat/DownloadButton";
import { AppTooltip } from "../Chat/AppTooltip";
import { useMemo, useState } from "react";
import { If } from "../../utils/If";
import { classList } from "../../utils/utils";
import { ClipboardDeleteButton } from "./ClipboardDeleteButton";
import { useFilesStore } from "../../store/filesStore";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useToggle } from "../../hooks/useToggle";

export const ClipboardPdf = ({
	file,
	maxHeight,
	preview,
	name,
	type,
}: ClipboardElementProps) => {
	const styles = useStyles();
	const [currentPage, setCurrentPage] = useState(1);
	const [numPages, setNumPages] = useState(0);

	const [loading, , onLoad] = useToggle(true);

	const removeFile = useFilesStore((state) => state.removeFile);

	const onClickRemove = () => {
		if (file instanceof File) {
			removeFile(file);
		}
	};

	const nextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, numPages));
	};

	const prevPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const pages = useMemo(() => {
		return Array(numPages)
			.fill(null)
			.map((_, index) => {
				const page = index + 1;
				return (
					<Page
						className={classList(
							styles.pdfPage,
							loading && styles.hidden,
							currentPage !== page && styles.hidden
						)}
						pageNumber={page}
						height={preview ? maxHeight : undefined}
						onRenderSuccess={onLoad}
					></Page>
				);
			});
	}, [
		currentPage,
		loading,
		maxHeight,
		numPages,
		onLoad,
		preview,
		styles.hidden,
		styles.pdfPage,
	]);

	const iconSize = preview ? 10 : 30;

	return (
		<Box className={styles.container}>
			<AppTooltip title={name} enabled={!preview}>
				<Box>
					<Document
						className={classList(styles.pdf, loading && styles.hidden)}
						file={file}
						onLoadSuccess={({ numPages }) => setNumPages(numPages)}
					>
						{pages}
					</Document>

					<Box className={styles.arrowsContainer}>
						<IconButton onClick={prevPage}>
							<FaChevronLeft className={styles.icon} size={iconSize} />
						</IconButton>

						<IconButton onClick={nextPage}>
							<FaChevronRight className={styles.icon} size={iconSize} />
						</IconButton>
					</Box>

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
	arrowsContainer: {
		position: "absolute",
		display: "flex",
		flex: 1,
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 100,
		pointerEvents: "none",
	},
	icon: {
		filter: "drop-shadow(0 0 3px black)",
		color: "whitesmoke",
		pointerEvents: "all",
	},
});
