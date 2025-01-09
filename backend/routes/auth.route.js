import express from "express";
import {
  authentication,
  deleteAccount,
  logout,
  signin,
  signup,
  userDetails,
} from "../controller/auth.controller.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/logout").post(logout);
router.route("/deleteAccount").post(authentication, deleteAccount);
router.route("/userDetails").get(authentication, userDetails);

export default router;
