import mongoose from "mongoose";
import User from "./user.model.js";

const officerSchema = new mongoose.Schema(
	{
		designation: {
			type: String,
			required: [true, "Designation Required"],
			trim: true,
		},

		fundings: {
			type: Number,
			default: 0,
		},

		funds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Fund",
			},
		],

		fundedEvents: [
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

const Officer = User.discriminator("Officer", officerSchema);

export default Officer;
