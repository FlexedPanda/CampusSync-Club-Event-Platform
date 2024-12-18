import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const token = (req, res, next) => {
	try {
		const token = req.headers.token;

		if (!token) {
			return res.status(401).json({
				success: false,
				message: "Token Required",
			});
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Invalid or Expired Token",
			error: error.message,
		});
	}
};

export const protect = async (req, res, next) => {
	try {
		const token = req.headers.token;
		const type = req.headers.type;

		if (!token || !type) {
			return res.status(401).json({
				success: false,
				message: "Authentication Required",
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select("-password");

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid User",
				redirect: "/app/home/login",
			});
		}

		if (user.role !== type) {
			return res.status(403).json({
				success: false,
				message: "Unauthorized Access",
				redirect: "/app/home/login",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(403).json({
			success: false,
			message: "Validation Failed",
			error: error.message,
		});
	}
};
