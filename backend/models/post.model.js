import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		title: { 
      type: String, 
      required: [true, "Title Required"], 
    },

		content: { 
      type: String, 
      required: [true, "Content Required"], 
    },

		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Panel",
			required: [true, "Author Required"],
		},

		club: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Club" 
    },

		event: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Event" 
    }, 
	},
	{ 
    timestamps: true 
  }
);

module.exports = mongoose.model("Post", postSchema);
