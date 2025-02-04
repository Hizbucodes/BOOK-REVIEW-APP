import { User } from "../models/user.model.js";
import Bcrypt from "bcrypt";
import { generateJsonWebToken } from "../utils/generateJsonWebToken.js";
import jwt from "jsonwebtoken";

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

    const token = generateJsonWebToken(res, {
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

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    if (!result || !(await Bcrypt.compare(password, result.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Email or Password is Incorrect",
      });
    }

    const token = generateJsonWebToken(res, {
      id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      userRole: result.userRole,
    });

    return res.status(200).json({
      sttaus: "success",
      messsage: "Successfully logged in",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error ${error.message}`,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: no token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      status: "success",
      message: "Your Account has been deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error ${err.message}`,
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const loggedInUser = await User.findById(decoded.id);

    if (!loggedInUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user: {
        id: loggedInUser.id,
        firstName: loggedInUser.firstName,
        lastName: loggedInUser.lastName,
        email: loggedInUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized: token not provided",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({
    status: "success",
    message: "Logged Out Successfully",
  });
};

export const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: token not provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.id = decoded.id;
    req.userRole = decoded.userRole;

    return next();
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: `Internal Server Error ${error.message}`,
    });
  }
};

export const authorization = (...userRoles) => {
  const checkPermission = async (req, res, next) => {
    console.log("USER ROLE: ", userRoles.includes(req.userRole));
    if (!userRoles.includes(req.userRole)) {
      return res.status(403).json({
        status: "fail",
        message: "You don't have permission to perform this action",
      });
    }
    return next();
  };

  return checkPermission;
};
