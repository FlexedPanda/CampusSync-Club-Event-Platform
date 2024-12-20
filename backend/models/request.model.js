import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
      unique: [true, "Request Exists"],
      trim: true,
    },

    cover: {
      type: String,
      required: [true, "Cover Required"],
      unique: [true, "Request Exists"],
    },

    description: {
      type: String,
      required: [true, "Description Required"],
      unique: [true, "Request Exists"],
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

export default Request;
