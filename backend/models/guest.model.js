import mongoose from "mongoose";
import User from "./user.model.js";

const guestSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			enum: ["Unregistered", "Registered"],
		},

		club: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Club",
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

const Guest = User.discriminator("Guest", guestSchema);

export default Guest;
