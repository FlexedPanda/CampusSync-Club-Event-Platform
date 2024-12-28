import mongoose from "mongoose";
import User from "./user.model.js";

const panelSchema = new mongoose.Schema(
	{ 
		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: [true, "Club Required"],
		},

		designation: {
			type: String,
			required: [true, "Designation Required"],
		},
	},
	{
		timestamps: true,
	}
);

const Panel = User.discriminator("Panel", panelSchema);

export default Panel;
