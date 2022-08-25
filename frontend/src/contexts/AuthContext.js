import React, { useContext, useState } from "react";
import axios from "axios";
const AuthContext = React.createContext();
const config = require("../config/apipaths.json");
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading] = useState(false);

	const login = async (email, password) => {
		await axios
			.post(config.login, {
				email: email,
				password: password,
			})
			.then((res) => {
				console.log(res.data.token);
				setCurrentUser(res.data.token);
			})
			.catch((err) => console.log(err));
	};

	const logout = async () => {
		console.log("Logged Out");
		setCurrentUser(null);
	};

	const value = {
		currentUser,
		login,
		logout,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
