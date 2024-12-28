import mongoose from "mongoose";
import User from "./user.model.js";

const sponsorSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Company Required"],
			unique: [true, "Sponsor Exists"],
		},

		sponsored: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: false,
		},

		funds : {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Sponsor = User.discriminator("Sponsor", sponsorSchema);

export default Sponsor;
