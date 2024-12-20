import multer from "multer";
import jwt from "jsonwebtoken";

import Panel from "../models/panel.model.js";
import Club from "../models/club.model.js";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

export const upload = multer({ storage: storage }).single("cover");

export const club = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Required",
      });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    const panel = await Panel.findById(user.id);
    const club = await Club.findById(panel.club);
		if (!club) {
			return res.status(400).json({
				success: false,
				message: "Club Not Found",
			});
		}

    req.club = club;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
