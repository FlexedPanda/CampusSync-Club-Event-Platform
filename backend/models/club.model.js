import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name required"],
			unique: [true, "Club Exists"],
		},

		panels: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Panel",
			},
		],

		event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
		},

		reserve: {
			type: Number,
			default: 0,
		}
	},
	{
		timestamps: true,
	}
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
