import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title Required"],
		},

		cover: {
			type: String,
			required: [true, "Cover Required"],
		},

		description: {
			type: String,
			required: [true, "Description Required"],
		},

		speakers: [
			{
				type: String,
				required: [true, "Speaker Required"],
			},
		],

		date: {
			type: Date,
			required: [true, "Date Required"],
		},

		venue: {
			type: String,
			required: [true, "Venue Required"],
		},

		entryFee: {
			type: Number,
			required: [true, "Entry Required"],
		},

		eventCost: {
			type: Number,
			required: [true, "Cost Required"],
		},

		capacity: {
			type: Number,
			required: [true, "Capacity Required"],
		},

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

		fundings: {
			type: Number,
			required: [true, "Fundings Required"],
		},

		earnings: {
			type: Number,
			required: [true, "Earnings Required"],
		},
	},
	{
		timestamps: true,
	}
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
