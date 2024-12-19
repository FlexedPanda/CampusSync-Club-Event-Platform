import mongoose from "mongoose";
import User from "./user.model.js";

const officerSchema = new mongoose.Schema(
	{
		designation: {
			type: String,
			required: [true, "Designation Required"],
		},

		fundings: {
			type: Number,
			required: [true, "Funding Required"],
		},
	},
	{
		timestamps: true,
	}
);

const Officer = User.discriminator("Officer", officerSchema);

export default Officer;
