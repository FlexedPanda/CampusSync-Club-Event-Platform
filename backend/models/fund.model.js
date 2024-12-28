import mongoose from "mongoose";

const fundSchema = new mongoose.Schema(
	{
    amount: { 
      type: Number, 
      default: 0, 
    },

		funds : {
			type: Number,
			default: 0,
		},

    event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: [true, "Event Required"],
		},

		sponsor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sponsor",
			required: false,
		},

		officer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Officer", 
			required: [true, "Officer Required"],
    },
	},
	{ 
    timestamps: true 
  }
);

const Fund = mongoose.model("Fund", fundSchema);

export default Fund;
