import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<p>Frontend App running successfully</p>} />
			</Routes>
		</Router>
	);
}

export default App;
