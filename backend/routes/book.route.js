import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controller/book.controller.js";
import {
  authentication,
  authorization,
} from "../controller/auth.controller.js";

const router = express.Router();

router
  .route("/createBook")
  .post(authentication, authorization("user"), createBook);
router.route("/getAllBooks").get(getAllBooks);
router
  .route("/updateBook/:id")
  .patch(authentication, authorization("user"), updateBook);
router
  .route("/deleteBook/:id")
  .delete(authentication, authorization("user"), deleteBook);

export default router;
