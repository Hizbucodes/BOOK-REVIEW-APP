import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: [
      {
        type: String,
        required: [true, "Author is required"],
      },
    ],
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
