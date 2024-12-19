import Club from "../models/club.model.js";

export const list = async (req, res) => {
	try {
		const clubs = await Club.find({}, { _id: 1, name: 1 });
		res.status(200).json({
			success: true,
			message: "Clubs fetched successfully",
			clubs,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};
