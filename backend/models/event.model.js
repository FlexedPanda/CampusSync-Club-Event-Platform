import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title Required"],
			unique: [true, "Event Exists"],
		},

		cover: {
			type: String,
			required: [true, "Cover Required"],
			unique: [true, "Event Exists"],
		},

		description: {
			type: String,
			required: [true, "Description Required"],
			unique: [true, "Event Exists"],
		},

		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: [true, "Club Required"],
		},

		panels: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Panel",
			},
		],

		eventCost: {
			type: Number,
			required: [true, "Cost Required"],
		},

		capacity: {
			type: Number,
			required: [true, "Capacity Required"],
		},

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
