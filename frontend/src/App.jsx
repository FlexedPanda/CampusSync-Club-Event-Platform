import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<p>Frontend APP is running successfully</p>} />
		</Routes>
	);
}

export default App;
