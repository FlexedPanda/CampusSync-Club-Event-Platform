import multer from "multer";
import storage from "../config/multer.config.js";

export const upload = multer({
	storage: storage,
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
}).single("cover");
