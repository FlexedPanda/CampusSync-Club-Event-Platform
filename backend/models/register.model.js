import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
  {
		name: {
			type: String,
      trim: true,
			required: [true, "Name Required"],
			unique: [true, "Request Exists"],
		},

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: false,
    },

    phone: {
			type: String,
      trim: true,
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
      trim: true,
			lowercase: true,
			required: [true, "Email Required"],
			unique: [true, "Email Exists"],
			validate: {
				validator: (v) => {
					return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
				},
				message: (props) => `${props.value} is Not a Valid Email!`,
			},
		},

		password: {
			type: String,
      minlength: 4,
			required: [true, "Password Required"],
		},
  },
  {
    timestamps: true,
  }
);

const Register = mongoose.model("Register", registerSchema);

export default Register;
