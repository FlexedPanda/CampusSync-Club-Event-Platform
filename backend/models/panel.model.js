import mongoose from "mongoose";
import User from "./user.model.js";

const panelSchema = new mongoose.Schema(
	{ 
		designation: {
			type: String,
			required: [true, "Designation Required"],
			trim: true,
		},

		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: [true, "Club Required"],
		},

		clubEvent: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},

		joinedEvents: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Event",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Panel = User.discriminator("Panel", panelSchema);

export default Panel;
