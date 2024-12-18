import mongoose from "mongoose";
import User from "./user.model.js";

const sponsorSchema = new mongoose.Schema(
	{
		status: {
			type: String,
			enum: ["Unverified", "Referred", "Verified"],
		},

		company: {
			type: String,
			required: [true, "Company Required"],
			unique: [true, "Sponsor Exists"],
			trim: true,
		},

		sponsorEvent: {
			type: mongoose.Schema.Types.ObjectId,
			required: [true, "Event Required"],
			ref: "Event",
		},

		fundings : {
			type: Number,
			default: 0,
		},

		funds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Fund",
			},
		],

		sponsoredEvents: [
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

const Sponsor = User.discriminator("Sponsor", sponsorSchema);

export default Sponsor;
