import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(false);
	const [type, setType] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		const type = localStorage.getItem("type");
		if (token) {
			setUser(true);
			setType(type);
		}
	}, []);

	const loggedIn = (token, type) => {
		localStorage.setItem("token", token);
		localStorage.setItem("type", type);
		setUser(true);
		setType(type);
	};

	const loggedOut = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("type");
		setUser(false);
		setType(null);
	};

	return (
		<AuthContext.Provider value={{ user, type, loggedIn, loggedOut }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
