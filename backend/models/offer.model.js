import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    amount: { 
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
      required: [true, "Sponsor Required"],
    },
  },
  { 
    timestamps: true 
  }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;
