import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    panel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Panel",
      required: [true, "Panel Required"],
    },

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

    date: {
      type: Date,
      required: [true, "Date Required"],
    },

    venue: {
      type: String,
      required: [true, "Venue Required"],
      trim: true,
    },

    entryFee: {
      type: Number,
      required: [true, "Entry Required"],
    },

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

const Request = mongoose.model("Request", requestSchema);

export default Request;
