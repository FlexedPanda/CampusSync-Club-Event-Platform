import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title Required"],
			trim: true,
		},

		description: {
			type: String,
			required: [true, "Description Required"],
			trim: true,
		},

		venue: {
			type: String,
			required: [true, "Venue Required"],
			trim: true,
		},

		date: {
			type: Date,
			required: [true, "Date Required"],
			trim: true,
		},

		panel: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Panel",
			required: [true, "Panel Required"],
		},

		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: [true, "Club Required"],
		},
	},
	{
		timestamps: true,
	}
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
