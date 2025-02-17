import mongoose from "mongoose";

const applySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name Required"],
    },

    company: {
      type: String,
      trim: true,
      required: [true, "Company Required"],
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },

    phone: {
      type: String,
      trim: true,
      required: [true, "Phone Required"],
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
  },
);

const Apply = mongoose.model("Apply", applySchema);

export default Apply;
