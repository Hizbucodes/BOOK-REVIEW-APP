import { User } from "../models/user.model.js";
import Bcrypt from "bcrypt";
import { generateJsonWebToken } from "../utils/generateJsonWebToken.js";

export const signup = async (req, res) => {
  const body = req.body;

  try {
    if (!["admin", "user"].includes(body.userRole)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid User Role",
      });
    }

    if (body.password !== body.confirmPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password and Confirm Password must be same",
      });
    }

    const hashedPassword = await Bcrypt.hash(body.password, 10);

    const newUser = new User({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      userRole: body.userRole,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = generateJsonWebToken({
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
    });

    const result = {
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      userRole: savedUser.userRole,
      token,
    };

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Failed to create user",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Successfully signed up",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error ${error.message}`,
    });
  }
};

export const signin = async (req, res) => {};

export const deleteAccount = async (req, res) => {};

export const userDetails = async (req, res) => {};

export const authentication = async (req, res) => {};
