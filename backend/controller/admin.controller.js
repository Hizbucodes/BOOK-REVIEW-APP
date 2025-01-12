import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";

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

export const getAllBooks = async (req, res) => {};

export const deleteABook = async (req, res) => {};
