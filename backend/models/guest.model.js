import mongoose from "mongoose";
import User from "./user.model.js";

const guestSchema = new mongoose.Schema(
	{
		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Guest = User.discriminator("Guest", guestSchema);

export default Guest;
