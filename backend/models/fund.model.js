import mongoose from "mongoose";

const fundSchema = new mongoose.Schema(
	{
    status: {
			type: String,
			enum: ["Provided", "Approved", "Funded"],
		},

    amount: { 
      type: Number, 
      required: [true, "Amount Required"], 
    },

    event: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Event",
			required: [true, "Event Required"],
		},

		sponsor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sponsor",
		},

		officer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Officer" 
    },
	},
	{ 
    timestamps: true 
  }
);

const Fund = mongoose.model("Fund", fundSchema);

export default Fund;
