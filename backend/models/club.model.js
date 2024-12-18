import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Club Name required"],
			trim: true,
		},

		panel: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Panel",
			},
		],

		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Guest",
			},
		],

		events: [
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

const Club = mongoose.model("Club", clubSchema);

export default Club;
