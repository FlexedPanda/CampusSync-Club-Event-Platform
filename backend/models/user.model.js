import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name Required"],
		},

		role: {
			type: String,
			enum: ["Guest", "Panel", "Sponsor", "Officer"],
			required: [true, "Role Required"],
		},

		credits: {
			type: Number,
			default: 1000,
		},

		phone: {
			type: String,
			required: [true, "Phone Required"],
			unique: [true, "Phone Exists"],
		},

		email: {
			type: String,
			required: [true, "Email Required"],
			unique: [true, "Email Exists"],
		},

		password: {
			type: String,
			required: [true, "Password Required"],
		},
	},
	{
		discriminatorKey: "role",
		collection: "users",
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
