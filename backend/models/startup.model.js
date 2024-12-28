import mongoose from "mongoose";

const startupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Required"],
    },

    description: {
      type: String,
      required: [true, "Description Required"],
    },

    venue: {
			type: String,
			required: [true, "Venue Required"],
      unique: [true, "Startup Exists"],
		},

    date: {
			type: Date,
			required: [true, "Date Required"],
      unique: [true, "Startup Exists"],
		},

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "Club Required"],
      unique: [true, "Startup Exists"],
    },

    cost: {
      type: Number,
      required: [true, "Cost Required"],
    },

    capacity: {
      type: Number,
      required: [true, "Capacity Required"],
    },

    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Officer",
      required: [true, "Officer Required"],
    },
  },
  {
    timestamps: true,
  }
);

const Startup = mongoose.model("Startup", startupSchema);

export default Startup;
