import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name Required"],
			trim: true,
		},

		role: {
			type: String,
			required: true,
			enum: ["Guest", "Panel", "Sponsor", "Officer"],
		},

		phone: {
			type: String,
			required: [true, "Phone Required"],
			unique: [true, "Phone Exists"],
			validate: {
				validator: (v) => {
					return /^01[3-9]\d{8}$/.test(v);
				},
				message: (props) => `${props.value} is Not a Valid Phone Number!`,
			},
		},

		email: {
			type: String,
			required: [true, "Email Required"],
			unique: [true, "Email Exists"],
			lowercase: true,
			validate: {
				validator: (v) => {
					return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
				},
				message: (props) => `${props.value} is Not a Valid Email!`,
			},
		},

		password: {
			type: String,
			required: [true, "Password Required"],
			minlength: 4,
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
