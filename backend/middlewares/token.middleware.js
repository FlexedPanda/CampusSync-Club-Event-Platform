import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import Guest from "../models/guest.model.js";
import Panel from "../models/panel.model.js";
import Sponsor from "../models/sponsor.model.js";
import Officer from "../models/officer.model.js";

export const token = async (req, res, next) => {
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
    const user = await User.findById(decoded.id).populate("club");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Does Not Exist",
        redirect: "/app/home/login",
      });
    }

    if (user.role !== type) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized User Access",
        redirect: "/app/home/login",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access Token Expired",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid Access Token",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Token Validation Failed",
      error: error.message,
    });
  }
};
