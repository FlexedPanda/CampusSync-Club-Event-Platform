import axios from "axios";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./assets/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
