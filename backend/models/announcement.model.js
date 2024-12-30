import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title Required"]
  },
  content: {
    type: String,
    required: [true, "Content Required"]  
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club"
  },
  event: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event"
  }
}, {
  timestamps: true
});

export default mongoose.model("Announcement", announcementSchema);