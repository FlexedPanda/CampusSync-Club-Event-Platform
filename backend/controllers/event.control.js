import Event from "../models/event.model.js";

export const list = async (req, res) => {
	try {
		const events = await Event.find({}, { _id: 1, title: 1 });
		res.status(200).json({
			success: true,
			message: "Events fetched successfully",
			events,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};
