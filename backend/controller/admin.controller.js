import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { Review } from "../models/review.model.js";

import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password").select("-userRole");

    if (!users) {
      return res.status(404).json({
        status: "fail",
        message: "No users found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Successfully fetched all users",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      messsage: `Internal Server Error: ${error.messsage}`,
    });
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    if (!books) {
      return res.status(404).json({
        status: "fail",
        message: "No books found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Successfully fetched all books",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      messsage: `Internal Server Error: ${error.messsage}`,
    });
  }
};

export const deleteABook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid book ID format",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Requested book not found",
      });
    }

    await Review.deleteMany({ book: bookId });

    await Book.findByIdAndDelete(bookId);

    return res.status(200).json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${error.message}`,
    });
  }
};
