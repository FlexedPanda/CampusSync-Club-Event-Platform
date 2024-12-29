import mongoose from "mongoose";

const editSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Required"],
    },
    currentName: {
      type: String,
      required: [true, "Current Name Required"],
    },
    newName: {
      type: String,
      required: [true, "New Name Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
    }
  },
  {
    timestamps: true,
  }
);

const Edit = mongoose.model("Edit", editSchema);
export default Edit;