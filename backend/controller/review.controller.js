import { Review } from "../models/review.model.js";
import { Book } from "../models/book.model.js";

export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { comment, rating } = req.body;

    const userID = req.id;

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }

    const bookReviewedAlready = await Review.findOne({
      book: bookId,
      user: userID,
    });

    if (bookReviewedAlready) {
      return res.status(400).json({
        status: "fail",
        message: "You have already reviewed this book",
      });
    }

    const newReview = await Review.create({
      comment,
      rating,
      book: bookId,
      user: userID,
    });

    return res.status(201).json({
      status: "success",
      message: "Review Created Successfully",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export const deleteReview = async (req, res) => {};

export const updateReview = async (req, res) => {};

export const getAllReviewsForABook = async (req, res) => {};
