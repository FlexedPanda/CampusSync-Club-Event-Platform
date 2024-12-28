import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Title Required"],
		},

		description: {
			type: String,
			required: [true, "Description Required"],
		},

		venue: {
			type: String,
			required: [true, "Venue Required"],
			unique: [true, "Event Exists"],
		},

		date: {
			type: Date,
			required: [true, "Date Required"],
			unique: [true, "Event Exists"],
		},

		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: [true, "Club Required"],
			unique: [true, "Event Exists"],
		},

		cost: {
			type: Number,
			required: true,
			default: 0,
		},

		capacity: {
			type: Number,
			required: [true, "Capacity Required"],
		},

		officer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Officer",
			required: [true, "Officer Required"],
		},

		cover: {
			type: String,
			required: [true, "Cover Required"],
			unique: [true, "Cover Exists"],
		},

		entry: {
			type: Number,
			default: 0,
		},

		funds: {
			type: Number,
			default: 0,
		},

		revenue: {
			type: Number,
			default: 0,
		},

		guests: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
