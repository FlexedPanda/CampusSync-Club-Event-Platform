import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
      unique: [true, "Startup Exists"],
      trim: true,
    },

    cover: {
      type: String,
      required: [true, "Cover Required"],
      unique: [true, "Startup Exists"],
    },

    description: {
      type: String,
      required: [true, "Description Required"],
      unique: [true, "Startup Exists"],
      trim: true,
    },

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "Club Required"],
    },

    panels: [
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
