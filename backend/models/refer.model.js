import mongoose from "mongoose";

const referSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Required"],
      unique: [true, "Refer Exists"],
    },

    company: {
      type: String,
      required: [true, "Company Required"],
      unique: [true, "Sponsor Exists"],
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event Required"],
    },

    panel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panel",
      required: [true, "Panel Required"],
    },

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "Club Required"],
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
    timestamps: true,
  },
);

const Refer = mongoose.model("Refer", referSchema);

export default Refer;
