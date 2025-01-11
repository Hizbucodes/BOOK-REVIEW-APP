import express from "express";
import {
  addReview,
  deleteReview,
  getAllReviewsForABook,
  updateReview,
} from "../controller/review.controller.js";
import {
  authentication,
  authorization,
} from "../controller/auth.controller.js";

const router = express.Router();

router
  .route("/addReview/:bookId")
  .post(authentication, authorization("user"), addReview);
router
  .route("/deleteReview/:reviewId")
  .delete(authentication, authorization("user"), deleteReview);
router
  .route("/updateReview/:id")
  .put(authentication, authorization("user"), updateReview);
router
  .route("/getAllReviews/:id")
  .get(authentication, authorization("admin"), getAllReviewsForABook);

export default router;
