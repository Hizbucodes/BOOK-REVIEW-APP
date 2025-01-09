import express from "express";
import {
  deleteAccount,
  signin,
  signup,
  userDetails,
} from "../controller/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/deleteAccount").post(deleteAccount);
router.route("/userDetails").post(userDetails);

export default router;
