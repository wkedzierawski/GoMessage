import { Chat } from "./components/Chat/Chat";
import { AppThemeProvider } from "./components/AppThemeProvider";
import { Container } from "@mui/material";
import backgroundImage from "./assets/background.png";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { queryClient } from "./services/Query";
import { createUseStyles } from "react-jss";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

function App() {
	const styles = useStyles();

	return (
		<QueryClientProvider client={queryClient}>
			<AppThemeProvider>
				<Router>
					<Container className={styles.container}>
						<Routes>
							<Route path="/:chatId" Component={Chat} />
						</Routes>
					</Container>
				</Router>
			</AppThemeProvider>
		</QueryClientProvider>
	);
}

const useStyles = createUseStyles({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: "cover",
		maxWidth: "100vw",
		width: "100vw",
		height: "100vh",
		backgroundColor: "black",
	},
});

export default App;
