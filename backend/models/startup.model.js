import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
      trim: true,
    },

    cover: {
      type: String,
      required: [true, "Cover Required"],
    },

    description: {
      type: String,
      required: [true, "Description Required"],
      trim: true,
    },

    speakers: [
      {
        type: String,
        required: [true, "Speaker Required"],
        trim: true,
      },
    ],

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "Club Required"],
    },

    panel: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Panel",
      },
    ],

    eventCost: {
      type: Number,
      required: [true, "Cost Required"],
    },

    capacity: {
      type: Number,
      required: [true, "Capacity Required"],
    },
  },
  {
    timestamps: true,
  }
);

const Startup = mongoose.model("Startup", startupSchema);

export default Startup;
