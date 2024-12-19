import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name required"],
			unique: [true, "Club Exists"],
		},

		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},

		panel: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Panel",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
