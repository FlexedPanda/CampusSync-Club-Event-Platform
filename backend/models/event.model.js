import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title Required"],
			trim: true,
		},

		image: {
			type: String,
			required: [true, "Cover Required"],
		},

		status: {
			type: String,
			required: true,
			enum: ["Upcoming", "Ongoing", "Completed"],
		},

		description: {
			type: String,
			required: [true, "Description Required"],
			trim: true,
		},

		guests: [
			{
				type: String,
				required: [true, "Guests Required"],
				trim: true,
			},
		],

		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: [true, "Club Required"],
		},

		panel: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Panel",
			},
		],

		date: {
			type: Date,
			required: [true, "Date Required"],
		},

		venue: {
			type: String,
			required: [true, "Venue Required"],
			trim: true,
		},

		entryFee: {
			type: Number,
			required: [true, "Fee Required"],
			default: 0,
		},

		cost: {
			type: Number,
			required: [true, "Cost Required"],
			default: 0,
		},

		capacity: {
			type: Number,
			required: [true, "Capacity Required"],
			default: 0,
		},

		fundings: {
			type: Number,
			required: [true, "Fundings Required"],
			default: 0,
		},

		earnings: {
			type: Number,
			required: [true, "Earnings Required"],
			default: 0,
		},

		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
