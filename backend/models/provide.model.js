import mongoose from "mongoose";

const provideSchema = new mongoose.Schema(
  {
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
      required: [true, "Sponsor Required"],
    },
  },
  { 
    timestamps: true 
  }
);

const Provide = mongoose.model("Provide", provideSchema);

export default Provide;
