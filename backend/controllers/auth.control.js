import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Guest from "../models/guest.model.js";
import Sponsor from "../models/sponsor.model.js";

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "Invalid Email or Password",
			});
		}

		const pass = await bcryptjs.compare(password, user.password);
		if (!pass) {
			return res.status(400).json({
				success: false,
				message: "Invalid Email or Password",
			});
		}

		if (user.status === "Unregistered" || user.status === "Unverified") {
			return res.status(400).json({
				success: false,
				message: "Request Pending Approval",
			});
		}

		const payload = { id: user._id };
		const prod = process.env.NODE_ENV === "production";
		const token = jwt.sign(payload, process.env.JWT_SECRET);
		const type = user.role;

		res.cookie("token", token, { httpOnly: true, secure: prod });
		res.cookie("type", type, { httpOnly: true, secure: prod });
		return res.status(200).json({
			success: true,
			message: "Logged In Successfully",
			token,
			type,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const register = async (req, res) => {
	const { name, club, phone, email, password } = req.body;

	try {
		const user = await Guest.findOne({ email });
		if (user) {
			if (user.status === "Registered") {
				return res.status(400).json({
					success: false,
					message: "Guest Already Exists",
				});
			} else if (user.status === "Unregistered") {
				return res.status(400).json({
					success: false,
					message: "Request Already Sent",
				});
			}
		}

		if (password.length < 4) {
			throw new Error("Password Must Be At Least 4 Characters Long");
		}

		const hashedPassword = await bcryptjs.hash(password, 12);
		const guest = new Guest({
			name,
			club,
			phone,
			email,
			password: hashedPassword,
		});

		await guest.save();

		return res.status(201).json({
			success: true,
			message: "Request Sent Successfully",
			redirect: "/app/home/login",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const sponsor = async (req, res) => {
	const { name, company, phone, email, password } = req.body;

	try {
		const user = await Sponsor.findOne({ email });
		if (user) {
			if (user.status === "Verified") {
				return res.status(400).json({
					success: false,
					message: "Sponsor Already Exists",
				});
			} else if (user.status === "Unverified") {
				return res.status(400).json({
					success: false,
					message: "Request Already Sent",
				});
			}
		}

		if (password.length < 4) {
			throw new Error("Password Must Be At Least 4 Characters Long");
		}

		const hashedPassword = await bcryptjs.hash(password, 12);
		const sponsor = new Sponsor({
			name,
			company,
			phone,
			email,
			password: hashedPassword,
		});

		await sponsor.save();

		return res.status(201).json({
			success: true,
			message: "Request Sent Successfully",
			redirect: "/app/home/login",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const logout = async (req, res) => {
	try {
		const prod = process.env.NODE_ENV === "production";
		res.clearCookie("token", { httpOnly: true, secure: prod });
		res.clearCookie("type", { httpOnly: true, secure: prod });
		res.status(200).json({
			success: true,
			message: "Logged Out Successfully",
			redirect: "/app/home/login",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const profile = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User Does Not Exist",
			});
		}

		return res.status(200).json({
			success: true,
			message: "Profile Fetched Successfully",
			user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

export const access = (req, res) => {
	return res.status(200).json({
		success: true,
		message: "User Validated Successfully",
		user: req.user,
	});
};
