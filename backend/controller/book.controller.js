import { Book } from "../models/book.model.js";

export const createBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  const userID = req.id;

  if (!title || !author || !genre || !description) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all the fields",
    });
  }

  const newBook = await Book.create({
    title,
    author,
    genre,
    description,
    createdBy: userID,
  });

  return res.status(200).json({
    status: "success",
    message: "Book created successfully",
    data: newBook,
  });
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    if (books.length === 0) {
      return res.status(204).json({
        status: "success",
        message: "No Books were added yet",
      });
    }

    return res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export const updateBook = async (req, res) => {};

export const deleteBook = async (req, res) => {};
