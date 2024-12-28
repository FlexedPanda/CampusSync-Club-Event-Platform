import mongoose from "mongoose";

const joinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Required"],
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event Required"],
    },
  },
  {
    timestamps: true,
  }
);

const Join = mongoose.model("Join", joinSchema);

export default Join;
