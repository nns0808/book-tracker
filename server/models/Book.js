import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      minlength: [1, "Author must be at least 1 character"],

    },

    about: {
      type: String,
      maxlength: [500, "Description too long"],
      default: "",
    },

    like: {
      type: String,
      enum: ["Yes", "No"], 
      default: "No",
    },

    rating: {
      type: Number,
      min: [1, "Rating must be between 1 and 5"],
      max: [5, "Rating must be between 1 and 5"],
      default: 1,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);

