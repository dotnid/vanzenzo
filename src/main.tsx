import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/assets/css/animation.css";
import "@/assets/css/fonts.css";
import "@/assets/css/index.css";
import "@/assets/css/responsive.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<HelmetProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</HelmetProvider>
);
