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

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userID = req.id;
    const body = req.body;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        status: "fail",
        messsage: "Requested Book Not Found",
      });
    }

    if (book.createdBy.toString() !== userID) {
      return res.status(403).json({
        status: "fail",
        message: "You are not authorized to update this book",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title: body.title,
        author: body.author,
        genre: body.genre,
        description: body.description,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      status: "success",
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  const userID = req.id;

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Requested book not found",
    });
  }

  if (book.createdBy.toString() !== userID) {
    return res.status(403).json({
      status: "fail",
      message: "You are not authorized to update this book",
    });
  }

  await Book.findByIdAndDelete(id);

  return res.status(200).json({
    status: "success",
    message: "book deleted successfully",
  });
};
