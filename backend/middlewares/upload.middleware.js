import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../uploads");
	},
	filename: (req, file, cb) => {
		const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, `${file.originalname}-${suffix}`);
	},
});

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed (JPEG, JPG, PNG)"));
	}
};

const upload = multer({ storage, fileFilter }).single("image");

export default upload;
